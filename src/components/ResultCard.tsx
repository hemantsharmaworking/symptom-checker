import { useState } from 'react';
import { ChevronDown, ChevronUp, Stethoscope, HeartPulse, Brain, Activity, ShieldAlert } from 'lucide-react';
import type { MatchedCondition } from '@/types/clinical';

interface Props {
  result: MatchedCondition;
  index: number;
}

const triageConfig = {
  red: {
    label: 'Emergency',
    badge: 'bg-red-100 text-red-700 border-red-300',
    bar: 'bg-red-500',
    ring: 'border-l-red-500',
    icon: ShieldAlert,
  iconColor: 'text-red-500',
  glow: 'shadow-red-100',
  text: 'text-red-700',
  summary: 'Seek immediate emergency care.',
  summaryBg: 'bg-red-50 border-red-200',
  summaryText: 'text-red-700',
  summaryIcon: 'text-red-500',
  action: 'Call your local emergency number or go to the nearest ER now.',
  actionBg: 'bg-red-600',
    actionHover: 'hover:bg-red-700',
  actionText: 'text-white',
  border: 'border-red-200',
    cardBorder: 'border-red-200',
    cardBg: 'bg-red-50/30',
    cardHover: 'hover:border-red-400',
    cardRing: 'ring-red-200',
    dot: 'bg-red-500',
    chip: 'bg-red-50 text-red-700 border-red-200',
    chipText: 'text-red-700',
    chipBg: 'bg-red-50',
    chipBorder: 'border-red-200',
    chipIcon: 'text-red-500',
    chipHover: 'hover:bg-red-100',
  },
  orange: {
    label: 'Urgent',
    badge: 'bg-orange-100 text-orange-700 border-orange-300',
    bar: 'bg-orange-500',
    ring: 'border-l-orange-500',
    icon: Activity,
    iconColor: 'text-orange-500',
    glow: 'shadow-orange-100',
    text: 'text-orange-700',
    summary: 'Seek same-day or urgent care.',
    summaryBg: 'bg-orange-50 border-orange-200',
    summaryText: 'text-orange-700',
    summaryIcon: 'text-orange-500',
    action: 'Contact your doctor or visit an urgent care clinic today.',
    actionBg: 'bg-orange-500',
    actionHover: 'hover:bg-orange-600',
    actionText: 'text-white',
    border: 'border-orange-200',
    cardBorder: 'border-orange-200',
    cardBg: 'bg-orange-50/30',
    cardHover: 'hover:border-orange-400',
    cardRing: 'ring-orange-200',
    dot: 'bg-orange-500',
    chip: 'bg-orange-50 text-orange-700 border-orange-200',
    chipText: 'text-orange-700',
    chipBg: 'bg-orange-50',
    chipBorder: 'border-orange-200',
    chipIcon: 'text-orange-500',
    chipHover: 'hover:bg-orange-100',
  },
  green: {
    label: 'Routine',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    bar: 'bg-emerald-500',
    ring: 'border-l-emerald-500',
    icon: HeartPulse,
    iconColor: 'text-emerald-500',
    glow: 'shadow-emerald-100',
    text: 'text-emerald-700',
    summary: 'Routine medical appointment or home monitoring.',
    summaryBg: 'bg-emerald-50 border-emerald-200',
    summaryText: 'text-emerald-700',
    summaryIcon: 'text-emerald-500',
    action: 'Schedule a routine appointment with your healthcare provider.',
    actionBg: 'bg-emerald-500',
    actionHover: 'hover:bg-emerald-600',
    actionText: 'text-white',
    border: 'border-emerald-200',
    cardBorder: 'border-emerald-200',
    cardBg: 'bg-emerald-50/30',
    cardHover: 'hover:border-emerald-400',
    cardRing: 'ring-emerald-200',
    dot: 'bg-emerald-500',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chipText: 'text-emerald-700',
    chipBg: 'bg-emerald-50',
    chipBorder: 'border-emerald-200',
    chipIcon: 'text-emerald-500',
    chipHover: 'hover:bg-emerald-100',
  },
};

function categoryIcon(cat: string) {
  if (cat === 'Cardiovascular') return HeartPulse;
  if (cat === 'Neurological') return Brain;
  return Stethoscope;
}

export default function ResultCard({ result, index }: Props) {
  const [open, setOpen] = useState(index === 0);
  const cfg = triageConfig[result.triage];
  const Icon = cfg.icon;
  const CatIcon = categoryIcon(result.condition.category);
  const score = result.score;

  return (
    <div
      className={`rounded-2xl border ${cfg.cardBorder} ${cfg.cardBg} ${cfg.cardHover} transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden`}
    >
      {/* Header (clickable) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
      >
        {/* Triage dot + icon */}
        <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${cfg.chipBg} ${cfg.chipBorder} border`}>
          <Icon className={`h-6 w-6 ${cfg.iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
              {result.condition.name}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.badge}`}>
              {cfg.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <CatIcon className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">{result.condition.category}</span>
          </div>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-right">
          <div className={`text-2xl font-bold ${cfg.text}`}>{score}%</div>
          <div className="text-xs text-slate-400">match</div>
        </div>

        <div className="flex-shrink-0 text-slate-400">
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {/* Confidence bar */}
      <div className="px-4 sm:px-5 pb-1">
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full ${cfg.bar} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Expandable body */}
      {open && (
        <div className="px-4 sm:px-5 pb-5 pt-3 space-y-4 border-t border-slate-100/80 animate-[fadeIn_0.2s_ease-out]">
          {/* Triage recommendation banner */}
          <div className={`flex items-start gap-2.5 rounded-xl border ${cfg.summaryBg} p-3`}>
            <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${cfg.summaryIcon}`} />
            <div>
              <p className={`text-sm font-semibold ${cfg.summaryText}`}>{cfg.summary}</p>
              <p className="text-sm text-slate-600 mt-0.5">{cfg.action}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{result.condition.description}</p>
          </div>

          {/* Matched symptoms */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Matched Symptoms ({result.matchedSymptoms.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSymptoms.map((s) => (
                <span
                  key={s.symptom_id}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border ${cfg.chip}`}
                >
                  {s.is_cardinal && <span className={`font-bold ${cfg.chipIcon}`}>★</span>}
                  {s.name}
                  <span className="text-slate-400">· w{s.weight}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Missing cardinal symptoms */}
          {result.missingCardinal.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Key Symptoms Not Reported
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {result.missingCardinal.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-500"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Exclusion warning */}
          {result.hasExclusion && (
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5">
              <ShieldAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                Some reported symptoms are not typical for this condition, which lowered the confidence score.
              </p>
            </div>
          )}

          {/* Self-care / first aid */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              General Self-Care Guidance
            </h4>
            <ul className="space-y-1.5">
              {result.condition.first_aid_tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Specialist */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <Stethoscope className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">
              Recommended specialist: <span className="font-medium text-slate-700">{result.condition.recommended_specialist}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
