import type {
  AnalysisResult,
  Condition,
  MatchedCondition,
  TriageLevel,
  UserInput,
} from '@/types/clinical';
import { CONDITIONS } from '@/data/conditions';
import { SYMPTOM_MAP } from '@/data/symptoms';

const THRESHOLD = 30; // minimum % match to surface a condition
const EMERGENCY_URGENCY: TriageLevel = 'red';
const URGENT_URGENCY: TriageLevel = 'orange';
const ROUTINE_URGENCY: TriageLevel = 'green';

const DISCLAIMER =
  'This symptom checker is an educational decision-support tool and does not provide a medical diagnosis. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions about a medical condition. If you think you may have a medical emergency, call your local emergency number immediately.';

function triageFor(urgency: Condition['urgency_level']): TriageLevel {
  if (urgency === 'Emergency') return EMERGENCY_URGENCY;
  if (urgency === 'Urgent') return URGENT_URGENCY;
  return ROUTINE_URGENCY;
}

// Red-flag interceptor: any selected symptom flagged red triggers emergency mode.
function detectRedFlags(selected: string[]): string[] {
  return selected.filter((id) => SYMPTOM_MAP[id]?.red_flag);
}

// Severity/duration modifiers applied to the raw confidence score.
function severityMultiplier(severity: UserInput['severity']): number {
  switch (severity) {
    case 'severe':
      return 1.15;
    case 'moderate':
      return 1.0;
    case 'mild':
      return 0.9;
  }
}

function durationMultiplier(duration: UserInput['duration']): number {
  switch (duration) {
    case 'hours':
      return 0.95; // very early — may not have fully manifested
    case 'days':
      return 1.0;
    case 'weeks':
      return 1.05;
    case 'chronic':
      return 1.1;
  }
}

// Demographic filter: skip conditions outside applicable age/sex.
function appliesToDemographic(condition: Condition, input: UserInput): boolean {
  const ageRanges: Record<UserInput['ageGroup'], [number, number]> = {
    child: [0, 12],
    adolescent: [13, 17],
    adult: [18, 64],
    senior: [65, 120],
  };
  const [minAge, maxAge] = ageRanges[input.ageGroup];
  if (condition.min_age !== undefined && maxAge < condition.min_age) return false;
  if (condition.max_age !== undefined && minAge > condition.max_age) return false;
  if (condition.sex_restriction && input.sex !== 'unspecified' && condition.sex_restriction !== input.sex) {
    return false;
  }
  return true;
}

export function analyze(input: UserInput): AnalysisResult {
  const emergencySymptoms = detectRedFlags(input.selectedSymptoms);
  const emergencyTriggered = emergencySymptoms.length > 0;

  const selectedSet = new Set(input.selectedSymptoms);
  const sevMul = severityMultiplier(input.severity);
  const durMul = durationMultiplier(input.duration);

  const results: MatchedCondition[] = [];

  for (const condition of CONDITIONS) {
    if (!appliesToDemographic(condition, input)) continue;

    // Exclusionary rules: if any exclusion symptom is selected, penalize.
    const hasExclusion = condition.exclusion_symptoms.some((id) => selectedSet.has(id));

    // Weighted scoring: sum matched weights / sum total required weights.
    const matchedSymptoms = condition.symptoms.filter((s) => selectedSet.has(s.symptom_id));
    if (matchedSymptoms.length === 0) continue;

    const matchedWeight = matchedSymptoms.reduce((sum, s) => sum + s.weight, 0);
    const totalWeight = condition.symptoms.reduce((sum, s) => sum + s.weight, 0);

    let score = (matchedWeight / totalWeight) * 100;

    // Apply exclusion penalty.
    if (hasExclusion) score *= 0.6;

    // Severity/duration context.
    score *= sevMul * durMul;

    // Cardinal symptom presence bonus: if all cardinal symptoms matched, boost.
    const cardinalSymptoms = condition.symptoms.filter((s) => s.is_cardinal);
    const matchedCardinal = cardinalSymptoms.filter((s) => selectedSet.has(s.symptom_id));
    if (cardinalSymptoms.length > 0 && matchedCardinal.length === cardinalSymptoms.length) {
      score *= 1.1;
    }

    score = Math.min(Math.round(score), 100);

    const missingCardinal = cardinalSymptoms
      .filter((s) => !selectedSet.has(s.symptom_id))
      .map((s) => s.name);

    if (score >= THRESHOLD) {
      results.push({
        condition,
        matchedSymptoms,
        missingCardinal,
        score,
        triage: triageFor(condition.urgency_level),
        hasExclusion,
      });
    }
  }

  // Sort by urgency (Emergency > Urgent > Routine) then score descending.
  const urgencyRank: Record<string, number> = { Emergency: 0, Urgent: 1, Routine: 2 };
  results.sort((a, b) => {
    const ur = urgencyRank[a.condition.urgency_level] - urgencyRank[b.condition.urgency_level];
    if (ur !== 0) return ur;
    return b.score - a.score;
  });

  return {
    emergencyTriggered,
    emergencySymptoms,
    results,
    disclaimer: DISCLAIMER,
  };
}

export { DISCLAIMER };
