import { ShieldAlert, Phone, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EmergencyBanner({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.15s_ease-out]">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border-2 border-red-400 overflow-hidden animate[slideUp_0.2s_ease-out]">
        {/* Red header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">Emergency Symptoms Detected</h2>
            <p className="text-sm text-red-100">One or more red-flag symptoms require immediate attention.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4">
            <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700">Call your local emergency number immediately.</p>
              <p className="text-sm text-red-600 mt-1">
                Do not drive yourself. If possible, have someone call for you or take you to the nearest emergency room.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            The symptoms you reported are associated with potentially life-threatening conditions. Please review the
            results below — conditions marked <span className="font-semibold text-red-600">Emergency</span> should be
            treated as urgent.
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            I understand — show me the results
          </button>
        </div>
      </div>
    </div>
  );
}
