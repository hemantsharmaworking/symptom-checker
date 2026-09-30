import { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  ClipboardList,
  Gauge,
  BarChart3,
  RotateCcw,
  ShieldAlert,
  Info,
  Stethoscope,
  HeartPulse,
  Search,
} from 'lucide-react';
import SymptomSelector from '@/components/SymptomSelector';
import ResultCard from '@/components/ResultCard';
import EmergencyBanner from '@/components/EmergencyBanner';
import DisclaimerModal from '@/components/DisclaimerModal';
import { analyze } from '@/lib/engine';
import type { UserInput, AnalysisResult } from '@/types/clinical';

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { label: 'Demographics', icon: User },
  { label: 'Symptoms', icon: ClipboardList },
  { label: 'Severity', icon: Gauge },
  { label: 'Results', icon: BarChart3 },
];

export default function App() {
  const [step, setStep] = useState<Step>(0);
  const [ageGroup, setAgeGroup] = useState<UserInput['ageGroup']>('adult');
  const [sex, setSex] = useState<UserInput['sex']>('unspecified');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<UserInput['severity']>('moderate');
  const [duration, setDuration] = useState<UserInput['duration']>('days');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const canProceed = useMemo(() => {
    if (step === 0) return !!ageGroup;
    if (step === 1) return selectedSymptoms.length > 0;
    return true;
  }, [step, ageGroup, selectedSymptoms]);

  const handleAnalyze = () => {
    const input: UserInput = { ageGroup, sex, selectedSymptoms, severity, duration };
    const res = analyze(input);
    setResult(res);
    setStep(3);
    if (res.emergencyTriggered) {
      setTimeout(() => setShowEmergency(true), 400);
    }
  };

  const handleNext = () => {
    if (step === 2) {
      handleAnalyze();
      return;
    }
    setStep((s) => Math.min(3, s + 1) as Step);
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1) as Step);
  };

  const handleReset = () => {
    setStep(0);
    setAgeGroup('adult');
    setSex('unspecified');
    setSelectedSymptoms([]);
    setSeverity('moderate');
    setDuration('days');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 flex flex-col">
      <DisclaimerModal open={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
      <EmergencyBanner open={showEmergency} onClose={() => setShowEmergency(false)} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-sm">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">MedTriage</h1>
              <p className="text-[11px] text-slate-400 leading-tight">Intelligent Symptom Checker</p>
            </div>
          </div>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-600 transition"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Disclaimer</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Stepper */}
        {step < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={s.label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-200 scale-110'
                            : isDone
                            ? 'bg-sky-50 border-sky-300 text-sky-600'
                            : 'bg-white border-slate-200 text-slate-300'
                        }`}
                      >
                        {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? 'text-sky-600' : isDone ? 'text-sky-500' : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 h-0.5 mx-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full bg-sky-500 transition-all duration-500 ${
                            i < step ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="max-w-2xl mx-auto">
          {step === 0 && (
            <StepCard
              icon={User}
              title="Tell us about yourself"
              subtitle="This helps filter conditions relevant to your demographic group."
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2.5">Age group</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { v: 'child', l: 'Child', d: '0–12' },
                      { v: 'adolescent', l: 'Adolescent', d: '13–17' },
                      { v: 'adult', l: 'Adult', d: '18–64' },
                      { v: 'senior', l: 'Senior', d: '65+' },
                    ].map((opt) => (
                      <SelectCard
                        key={opt.v}
                        active={ageGroup === opt.v}
                        onClick={() => setAgeGroup(opt.v as UserInput['ageGroup'])}
                        title={opt.l}
                        desc={opt.d}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2.5">Biological sex</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { v: 'male', l: 'Male' },
                      { v: 'female', l: 'Female' },
                      { v: 'unspecified', l: 'Prefer not to say' },
                    ].map((opt) => (
                      <SelectCard
                        key={opt.v}
                        active={sex === opt.v}
                        onClick={() => setSex(opt.v as UserInput['sex'])}
                        title={opt.l}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </StepCard>
          )}

          {step === 1 && (
            <StepCard
              icon={ClipboardList}
              title="What symptoms are you experiencing?"
              subtitle="Search or browse by category. Select all that apply — the more accurate, the better the analysis."
            >
              <SymptomSelector selected={selectedSymptoms} onToggle={toggleSymptom} />
            </StepCard>
          )}

          {step === 2 && (
            <StepCard
              icon={Gauge}
              title="How severe and how long?"
              subtitle="This context adjusts the confidence scoring."
            >
              <div className="space-y-7">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Overall severity</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { v: 'mild', l: 'Mild', color: 'emerald' },
                      { v: 'moderate', l: 'Moderate', color: 'amber' },
                      { v: 'severe', l: 'Severe', color: 'red' },
                    ].map((opt) => (
                      <SeverityCard
                        key={opt.v}
                        active={severity === opt.v}
                        onClick={() => setSeverity(opt.v as UserInput['severity'])}
                        label={opt.l}
                        color={opt.color}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Duration</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { v: 'hours', l: 'Hours' },
                      { v: 'days', l: 'Days' },
                      { v: 'weeks', l: 'Weeks' },
                      { v: 'chronic', l: 'Chronic' },
                    ].map((opt) => (
                      <SelectCard
                        key={opt.v}
                        active={duration === opt.v}
                        onClick={() => setDuration(opt.v as UserInput['duration'])}
                        title={opt.l}
                      />
                    ))}
                  </div>
                </div>
                {/* Summary */}
                <div className="rounded-xl bg-sky-50 border border-sky-200 p-4">
                  <p className="text-sm text-sky-700">
                    <strong>{selectedSymptoms.length}</strong> symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
                    · Severity: <strong>{severity}</strong> · Duration: <strong>{duration}</strong>
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {step === 3 && result && <ResultsDashboard result={result} onReset={handleReset} />}
        </div>

        {/* Nav buttons */}
        {step < 3 && (
          <div className="max-w-2xl mx-auto mt-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition ${
                step === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-white border border-slate-200'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition ${
                canProceed
                  ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-200'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {step === 2 ? (
                <>
                  <Activity className="h-4 w-4" />
                  Analyze Symptoms
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
            <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
            <p>
              For educational purposes only — not a medical diagnosis. Always consult a healthcare professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function StepCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: typeof User;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-7 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-start gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 flex-shrink-0">
          <Icon className="h-5 w-5 text-sky-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function SelectCard({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition-all duration-200 ${
        active
          ? 'border-sky-400 bg-sky-50 ring-2 ring-sky-200'
          : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40'
      }`}
    >
      <div className={`text-sm font-semibold ${active ? 'text-sky-700' : 'text-slate-700'}`}>{title}</div>
      {desc && <div className="text-xs text-slate-400 mt-0.5">{desc}</div>}
    </button>
  );
}

function SeverityCard({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) {
  const colorMap: Record<string, { active: string; idle: string; dot: string }> = {
    emerald: { active: 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 text-emerald-700', idle: 'hover:border-emerald-200 hover:bg-emerald-50/40', dot: 'bg-emerald-500' },
    amber: { active: 'border-amber-400 bg-amber-50 ring-2 ring-amber-200 text-amber-700', idle: 'hover:border-amber-200 hover:bg-amber-50/40', dot: 'bg-amber-500' },
    red: { active: 'border-red-400 bg-red-50 ring-2 ring-red-200 text-red-700', idle: 'hover:border-red-200 hover:bg-red-50/40', dot: 'bg-red-500' },
  };
  const c = colorMap[color];
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-center transition-all duration-200 ${
        active ? c.active : `border-slate-200 bg-white text-slate-600 ${c.idle}`
      }`}
    >
      <div className={`mx-auto mb-1.5 h-2.5 w-2.5 rounded-full ${active ? c.dot : 'bg-slate-300'}`} />
      <div className="text-sm font-semibold">{label}</div>
    </button>
  );
}

function ResultsDashboard({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
  const emergencyCount = result.results.filter((r) => r.triage === 'red').length;
  const urgentCount = result.results.filter((r) => r.triage === 'orange').length;
  const routineCount = result.results.filter((r) => r.triage === 'green').length;

  return (
    <div className="space-y-5 animate-[fadeIn_0.4s_ease-out]">
      {/* Emergency alert */}
      {result.emergencyTriggered && (
        <div className="flex items-start gap-3 rounded-2xl bg-red-50 border-2 border-red-300 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-red-700">Emergency symptoms detected</h3>
            <p className="text-sm text-red-600 mt-0.5">
              Red-flag symptoms were identified in your input. Please seek immediate emergency care. The conditions
              below are ranked by urgency and confidence.
            </p>
          </div>
        </div>
      )}

      {/* Summary header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-100">
            <BarChart3 className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Analysis Results</h2>
            <p className="text-sm text-slate-500">
              {result.results.length === 0
                ? 'No conditions met the confidence threshold with the symptoms provided.'
                : `${result.results.length} possible condition${result.results.length > 1 ? 's' : ''} identified`}
            </p>
          </div>
        </div>

        {/* Triage summary chips */}
        {result.results.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <TriageChip count={emergencyCount} label="Emergency" color="red" icon={ShieldAlert} />
            <TriageChip count={urgentCount} label="Urgent" color="orange" icon={Activity} />
            <TriageChip count={routineCount} label="Routine" color="green" icon={HeartPulse} />
          </div>
        )}
      </div>

      {/* No results */}
      {result.results.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-700">No matching conditions found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            The symptoms you selected did not meet the confidence threshold for any condition in our database.
            Try adding more symptoms, or consult a healthcare professional if you're concerned.
          </p>
        </div>
      )}

      {/* Result cards */}
      <div className="space-y-3">
        {result.results.map((r, i) => (
          <ResultCard key={r.condition.condition_id} result={r} index={i} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <div className="flex items-start gap-2.5">
          <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">{result.disclaimer}</p>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-white hover:border-sky-300 hover:text-sky-600 transition"
      >
        <RotateCcw className="h-4 w-4" />
        Start New Assessment
      </button>
    </div>
  );
}

function TriageChip({
  count,
  label,
  color,
  icon: Icon,
}: {
  count: number;
  label: string;
  color: string;
  icon: typeof ShieldAlert;
}) {
  const map: Record<string, string> = {
    red: 'bg-red-50 text-red-700 border-red-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${map[color]} ${count === 0 ? 'opacity-40' : ''}`}>
      <Icon className="h-4 w-4" />
      {count} {label}
    </div>
  );
}
