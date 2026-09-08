import React from 'react';
import { UtensilsCrossed, Bell } from 'lucide-react';

interface HeaderProps {
  periodName: string;
  daysRemaining: number;
  hydrated: boolean;
  historyCount: number;
  onBellClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  periodName,
  daysRemaining,
  hydrated,
  historyCount,
  onBellClick,
}) => {
  return (
    <header className="sticky top-0 z-20 flex-shrink-0 border-b border-amber-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30">
            <UtensilsCrossed className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-tight tracking-tight text-slate-900">
              Katering
            </h1>
            <p className="text-[10px] text-slate-500 leading-tight">
              {hydrated ? `${periodName} · ${daysRemaining} hari lagi` : 'Memuat...'}
            </p>
          </div>
        </div>

        <button
          onClick={onBellClick}
          aria-label="Riwayat & Notifikasi"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm transition-transform active:scale-95 hover:bg-white hover:text-orange-600 border border-amber-200/40"
        >
          <Bell className="h-4 w-4" />
          {historyCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white shadow-sm">
              {historyCount > 99 ? '99+' : historyCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
