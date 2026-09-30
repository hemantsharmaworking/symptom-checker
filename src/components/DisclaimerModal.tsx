import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.15s_ease-out]">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden animate-[slideUp_0.2s_ease-out]">
        <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-4 flex items-center gap-3">
          <Info className="h-6 w-6 text-white" />
          <h2 className="text-lg font-bold text-white flex-1">Medical Disclaimer</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">
            This symptom checker is an <strong className="text-slate-800">educational decision-support tool</strong> and
            does not provide a medical diagnosis. It is not a substitute for professional medical advice, diagnosis,
            or treatment.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Always seek the advice of a qualified healthcare provider with any questions about a medical condition.
            Never disregard professional medical advice or delay seeking it because of something you have read here.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            If you think you may have a medical emergency, <strong className="text-red-600">call your local emergency
            number immediately</strong>.
          </p>
          <button
            onClick={onClose}
            className="w-full mt-2 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold transition"
          >
            I acknowledge and continue
          </button>
        </div>
      </div>
    </div>
  );
}
