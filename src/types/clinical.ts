// Core clinical domain types for the symptom checker.

export type UrgencyLevel = 'Emergency' | 'Urgent' | 'Routine';

export type TriageLevel = 'red' | 'orange' | 'green';

export type Category =
  | 'Respiratory'
  | 'Gastrointestinal'
  | 'Cardiovascular'
  | 'Neurological'
  | 'Dermatological'
  | 'Infections'
  | 'Metabolic'
  | 'Endocrine'
  | 'Musculoskeletal';

export interface SymptomDef {
  symptom_id: string;
  name: string;
  category: Category;
  /** Red-flag symptoms trigger emergency triage regardless of condition match. */
  red_flag?: boolean;
}

export interface ConditionSymptom {
  symptom_id: string;
  name: string;
  /** 1 (low) to 5 (pathognomonic). */
  weight: number;
  /** Cardinal symptoms are essential for the diagnosis. */
  is_cardinal: boolean;
}

export interface Condition {
  condition_id: string;
  name: string;
  category: Category;
  urgency_level: UrgencyLevel;
  symptoms: ConditionSymptom[];
  exclusion_symptoms: string[];
  description: string;
  first_aid_tips: string[];
  recommended_specialist: string;
  /** Optional demographic applicability hints. */
  min_age?: number;
  max_age?: number;
  sex_restriction?: 'male' | 'female';
}

export interface MatchedCondition {
  condition: Condition;
  matchedSymptoms: ConditionSymptom[];
  missingCardinal: string[];
  score: number;
  triage: TriageLevel;
  hasExclusion: boolean;
}

export interface AnalysisResult {
  emergencyTriggered: boolean;
  emergencySymptoms: string[];
  results: MatchedCondition[];
  disclaimer: string;
}

export interface UserInput {
  ageGroup: 'child' | 'adolescent' | 'adult' | 'senior';
  sex: 'male' | 'female' | 'unspecified';
  selectedSymptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  duration: 'hours' | 'days' | 'weeks' | 'chronic';
}
