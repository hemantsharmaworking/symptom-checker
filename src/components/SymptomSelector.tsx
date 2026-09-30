import { useState, useMemo } from 'react';
import { Search, X, AlertTriangle } from 'lucide-react';
import { SYMPTOMS, CATEGORIES, symptomsByCategory } from '@/data/symptoms';
import type { Category } from '@/types/clinical';

interface Props {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function SymptomSelector({ selected, onToggle }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SYMPTOMS;
    if (activeCategory !== 'All') list = symptomsByCategory(activeCategory);
    if (q) list = list.filter((s) => s.name.toLowerCase().includes(q));
    return list;
  }, [query, activeCategory]);

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symptoms (e.g. headache, fever, rash)..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <CategoryPill
          label="All"
          active={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
        />
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {/* Selected count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {selected.length === 0
            ? 'No symptoms selected yet'
            : `${selected.length} symptom${selected.length > 1 ? 's' : ''} selected`}
        </p>
      </div>

      {/* Symptom grid */}
      <div className="max-h-[340px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No symptoms match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((sym) => {
              const isSelected = selectedSet.has(sym.symptom_id);
              return (
                <button
                  key={sym.symptom_id}
                  onClick={() => onToggle(sym.symptom_id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition border ${
                    isSelected
                      ? 'bg-sky-50 border-sky-300 text-sky-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-sky-200 hover:bg-sky-50/50'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                      isSelected
                        ? 'bg-sky-500 border-sky-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                        <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1">{sym.name}</span>
                  {sym.red_flag && (
                    <span title="Red-flag symptom" className="flex items-center text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition border ${
        active
          ? 'bg-sky-500 text-white border-sky-500'
          : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700'
      }`}
    >
      {label}
    </button>
  );
}
