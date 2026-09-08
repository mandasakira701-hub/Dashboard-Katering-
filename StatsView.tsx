import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Package,
  ArrowUpRight,
  CheckCircle2,
  Trophy,
  Palette,
  MessageCircle,
  Maximize2,
  X,
  Heart,
} from 'lucide-react';
import { CateringItem, SummaryStatsData } from '../types';
import shinchanSkyImg from '../assets/images/shinchan_sky_card_1788907445926.jpg';
import shinchanBentoImg from '../assets/images/shinchan_bento_1788907638534.jpg';

interface StatsViewProps {
  stats: SummaryStatsData;
  items: CateringItem[];
  daysPassed: number;
}

const SHINCHAN_STAT_QUOTES = [
  'Wah kateringnya banyak yang laris manis! Nyam nyam 🍱',
  'Total katering udah dicatat semua belum nih? Hehehe 📝',
  'Sisa stok masih aman, jangan lupa sarapan & makan siang ya! 🍙',
  'Kalo ada katering Chocobi jangan lupa buat Shinchan ya! 🍫',
  'Semangat terus rekap kateringnya biar makin rapi! ✨',
];

export const StatsView: React.FC<StatsViewProps> = ({
  stats,
  items,
  daysPassed,
}) => {
  const [theme, setTheme] = useState<'shinchan' | 'sunset'>('shinchan');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const isShinchanTheme = theme === 'shinchan';

  const handleNextQuote = () => {
    setIsBouncing(true);
    setQuoteIdx((prev) => (prev + 1) % SHINCHAN_STAT_QUOTES.length);
    setTimeout(() => setIsBouncing(false), 400);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'shinchan' ? 'sunset' : 'shinchan'));
  };

  const topItems = [...items]
    .filter((it) => it.takenQty > 0)
    .sort((a, b) => b.takenQty - a.takenQty)
    .slice(0, 5);

  const maxTaken = topItems.length > 0 ? topItems[0].takenQty : 1;

  const statCards = [
    {
      label: 'Jenis Katering',
      value: stats.itemCount,
      sub: 'jenis',
      icon: Layers,
      color: 'bg-slate-500',
    },
    {
      label: 'Total Stok',
      value: stats.totalInitial,
      sub: 'unit awal',
      icon: Package,
      color: 'bg-amber-500',
    },
    {
      label: 'Diambil',
      value: stats.totalTaken,
      sub: 'unit terpakai',
      icon: ArrowUpRight,
      color: 'bg-orange-500',
    },
    {
      label: 'Sisa',
      value: stats.totalRemaining,
      sub: 'unit tersedia',
      icon: CheckCircle2,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-28 pt-4">
      {/* Monthly Summary Hero Card with Shinchan Theme */}
      <div
        className={`relative overflow-hidden rounded-3xl border transition-all duration-500 shadow-xl ${
          isShinchanTheme
            ? 'border-sky-300/80 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-sky-500/25'
            : 'border-amber-200/70 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-orange-500/30'
        }`}
      >
        {/* Sky Anime Artwork Background when in Shinchan Theme */}
        {isShinchanTheme ? (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={shinchanSkyImg}
                alt="Shinchan Blue Sky"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top opacity-35 mix-blend-overlay transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-900/60 to-sky-600/40" />
            </div>
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-amber-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-300/25 blur-3xl" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl" />
          </>
        )}

        {/* Floating Shinchan Bento Mascot at top-right */}
        <div
          onClick={() => setShowPhotoModal(true)}
          role="button"
          tabIndex={0}
          title="Klik untuk lihat Shinchan makan bento!"
          className={`group absolute -top-1 right-3 z-10 flex cursor-pointer items-center transition-transform active:scale-95 ${
            isBouncing ? 'animate-bounce' : 'hover:-translate-y-0.5'
          }`}
        >
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-white/90 bg-white/30 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300">
              <img
                src={shinchanBentoImg}
                alt="Shinchan Bento"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold ring-2 ring-white shadow">
              <Maximize2 className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>

        <div className="relative z-10 p-5">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2 pr-20">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-sm border border-white/20">
                <Sparkles className="h-4 w-4 text-amber-300" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold leading-tight drop-shadow-sm">
                  Ringkasan Bulanan
                </h2>
                <p className="text-[10px] text-white/85 font-medium">
                  {daysPassed} hari berjalan · Rata-rata {stats.avgPerDay.toFixed(1)} unit/hari
                </p>
              </div>
            </div>

            {/* Theme switcher toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={`Ubah ke tema ${isShinchanTheme ? 'Sunset' : 'Shinchan'}`}
              className="flex h-7 items-center gap-1 rounded-full bg-white/20 px-2 text-[10px] font-bold backdrop-blur-md border border-white/25 hover:bg-white/30 transition-colors"
            >
              <Palette className="h-3 w-3" />
              <span>{isShinchanTheme ? 'Shinchan' : 'Sunset'}</span>
            </button>
          </div>

          {/* 2 Big Stat Cards */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-md border border-white/15 shadow-inner">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/85">
                Total Diambil
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <p className="text-3xl font-black leading-none drop-shadow-md">
                  {stats.totalTaken}
                </p>
                <span className="text-xs font-semibold text-white/85">unit</span>
              </div>
              <p className="mt-1 text-[10px] text-amber-200 font-medium">
                unit terpakai
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-md border border-white/15 shadow-inner">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/85">
                Sisa Stok
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <p className="text-3xl font-black leading-none drop-shadow-md">
                  {stats.totalRemaining}
                </p>
                <span className="text-xs font-semibold text-white/85">unit</span>
              </div>
              <p className="mt-1 text-[10px] text-emerald-200 font-medium">
                unit tersedia
              </p>
            </div>
          </div>

          {/* Shinchan interactive dialog / speech bubble */}
          <div
            onClick={handleNextQuote}
            role="button"
            tabIndex={0}
            className="mt-3.5 flex cursor-pointer items-center gap-2 rounded-2xl bg-white/20 px-3 py-2 text-xs backdrop-blur-md border border-white/25 transition-all hover:bg-white/25 active:scale-[0.98]"
          >
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-sm">
              <MessageCircle className="h-3 w-3 fill-slate-900 text-slate-900" />
            </div>
            <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-white">
              <span className="text-amber-200 font-bold">Shinchan: </span>
              {SHINCHAN_STAT_QUOTES[quoteIdx]}
            </p>
            <span className="text-[9px] text-white/70 underline flex-shrink-0">
              ganti pesan
            </span>
          </div>
        </div>
      </div>

      {/* Shinchan Full View Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-sky-300/50 bg-slate-950 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowPhotoModal(false)}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md border border-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative max-h-[60vh] w-full overflow-hidden bg-sky-500">
              <img
                src={shinchanBentoImg}
                alt="Crayon Shin-chan Bento"
                referrerPolicy="no-referrer"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            <div className="p-4 bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-xs">
                  <Heart className="h-3.5 w-3.5 fill-slate-950" />
                </span>
                <h4 className="text-sm font-bold text-amber-300">
                  Crayon Shin-chan (Shinnosuke)
                </h4>
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                "Waktunya makan siang! Bento kateringnya enak banget, jangan sampai lupa cek sisa stoknya ya!"
              </p>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                Kembali ke Statistik
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-amber-200/60 bg-white/80 p-3 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${card.color} text-white shadow-sm`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  {card.label}
                </p>
              </div>
              <p className="mt-1.5 text-2xl font-extrabold text-slate-800 leading-none">
                {card.value}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Top 5 Catering Leaderboard */}
      <div className="rounded-3xl border border-amber-200/60 bg-white/80 p-4 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          <h2 className="text-sm font-bold text-slate-800">
            Top 5 Katering Terlaris
          </h2>
        </div>

        {topItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50/50 p-6 text-center">
            <p className="text-xs text-slate-500">
              Belum ada katering yang diambil. Mulai ambil item untuk melihat peringkat.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {topItems.map((item, idx) => {
              const barWidth = Math.max(8, (item.takenQty / maxTaken) * 100);
              const rankClass =
                idx === 0
                  ? 'bg-amber-400 text-white shadow-sm shadow-amber-400/50'
                  : idx === 1
                  ? 'bg-slate-300 text-slate-800'
                  : idx === 2
                  ? 'bg-orange-300 text-white'
                  : 'bg-slate-100 text-slate-600';

              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${rankClass}`}
                      >
                        {idx + 1}
                      </span>
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-orange-600 flex-shrink-0">
                      {item.takenQty} {item.unit}
                    </p>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
