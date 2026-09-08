import React from 'react';
import { Layers, Package, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { SummaryStatsData } from '../types';

interface SummaryStatsProps {
  stats: SummaryStatsData;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Jenis Katering',
      value: stats.itemCount,
      sub: 'jenis',
      icon: Layers,
      iconBg: 'bg-slate-500',
    },
    {
      label: 'Total Stok',
      value: stats.totalInitial,
      sub: 'unit awal',
      icon: Package,
      iconBg: 'bg-amber-500',
    },
    {
      label: 'Diambil',
      value: stats.totalTaken,
      sub: 'terpakai',
      icon: ArrowUpRight,
      iconBg: 'bg-orange-500',
    },
    {
      label: 'Sisa',
      value: stats.totalRemaining,
      sub: 'tersedia',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-500',
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="flex min-w-[110px] flex-shrink-0 flex-col gap-2 rounded-2xl border border-amber-200/60 bg-white/80 p-3 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg} text-white shadow-sm`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
              <p className="text-2xl font-extrabold text-slate-800 leading-none">
                {card.value}
              </p>
              <p className="text-[10px] text-slate-500">{card.sub}</p>
            </div>
          </div>
        );
      })}

      {/* Rata-rata per hari highlighted card */}
      <div className="flex min-w-[140px] flex-shrink-0 flex-col gap-2 rounded-2xl border border-rose-200/70 bg-gradient-to-br from-rose-500 to-pink-500 p-3 text-white shadow-md">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white shadow-sm backdrop-blur-sm">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">
            Rata-rata/Hari
          </p>
          <p className="text-2xl font-extrabold text-white leading-none">
            {stats.avgPerDay.toFixed(1)}
          </p>
          <p className="text-[10px] text-white/80">unit/hari</p>
        </div>
      </div>
    </div>
  );
};
