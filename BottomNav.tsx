import React from 'react';
import { Home, BarChart3, History, User } from 'lucide-react';
import { TabKey } from '../types';

interface BottomNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  historyBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  active,
  onChange,
  historyBadgeCount = 0,
}) => {
  const tabs = [
    { key: 'home' as TabKey, label: 'Beranda', icon: Home },
    { key: 'stats' as TabKey, label: 'Statistik', icon: BarChart3 },
    { key: 'history' as TabKey, label: 'Riwayat', icon: History },
    { key: 'profile' as TabKey, label: 'Profil', icon: User },
  ];

  return (
    <nav
      aria-label="Navigasi utama"
      className="relative z-30 w-full flex-shrink-0 border-t border-amber-200/70 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 shadow-[0_-4px_20px_-2px_rgba(120,53,15,0.08)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 6px)' }}
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex h-14 min-w-[64px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {label}
              </span>

              {key === 'history' && historyBadgeCount > 0 && (
                <span className="absolute top-2 right-4 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-orange-500 px-1 text-[8px] font-bold text-white shadow-sm">
                  {historyBadgeCount > 9 ? '9+' : historyBadgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* iOS style home indicator bar */}
      <div className="mx-auto mb-1 h-1 w-32 rounded-full bg-slate-800/40" />
    </nav>
  );
};
