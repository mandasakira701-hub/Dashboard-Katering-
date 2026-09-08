import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex w-full max-w-sm flex-col gap-2 px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isDestructive = toast.variant === 'destructive';
  const isSuccess = toast.variant === 'success';

  return (
    <div
      className={`pointer-events-auto flex items-start gap-2.5 rounded-2xl border p-3.5 shadow-xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-3 ${
        isDestructive
          ? 'border-rose-200 bg-rose-50/95 text-rose-900 shadow-rose-500/10'
          : isSuccess
          ? 'border-emerald-200 bg-emerald-50/95 text-emerald-900 shadow-emerald-500/10'
          : 'border-amber-200/80 bg-white/95 text-slate-800 shadow-orange-500/10'
      }`}
    >
      <div className="mt-0.5 flex-shrink-0">
        {isDestructive ? (
          <AlertCircle className="h-4 w-4 text-rose-600" />
        ) : isSuccess ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <Info className="h-4 w-4 text-amber-600" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold leading-tight">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-[11px] opacity-90 leading-tight">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 p-0.5"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
