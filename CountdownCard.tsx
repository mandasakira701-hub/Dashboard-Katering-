import React, { useState } from 'react';
import { Calendar, Sparkles, MessageCircle, Palette, Maximize2, X, Heart } from 'lucide-react';
import { calculatePeriodDays } from '../lib/storage';
import shinchanSkyImg from '../assets/images/shinchan_sky_card_1788907445926.jpg';
import shinchanPeekImg from '../assets/images/shinchan_peek_1788907429045.jpg';

interface CountdownCardProps {
  periodName: string;
  startDate: string;
  endDate: string;
  hydrated: boolean;
}

const SHINCHAN_QUOTES = [
  'Hehehe... Katering hari ini ada menu apa ya? 🍱',
  'Wah, sisa hari masih ada! Jangan lupa makan siang ya! ✨',
  'Kak, stok makanannya jangan sampai kehabisan ya! 🍛',
  'Chocobi-nya udah siap belum nih? Hehehe 🍫',
  'Semangat terus ya ngurus kateringnya hari ini! 💪',
  'Ayo habiskan nasinya biar makin berenergi! 🍙',
];

export const CountdownCard: React.FC<CountdownCardProps> = ({
  periodName,
  startDate,
  endDate,
  hydrated,
}) => {
  const { daysTotal, daysPassed, daysRemaining, progressPercent, todayLabel } =
    calculatePeriodDays(startDate, endDate);

  // Theme: 'shinchan' (anime blue sky) or 'sunset' (warm gradient)
  const [theme, setTheme] = useState<'shinchan' | 'sunset'>('shinchan');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleNextQuote = () => {
    setIsBouncing(true);
    setQuoteIndex((prev) => (prev + 1) % SHINCHAN_QUOTES.length);
    setTimeout(() => setIsBouncing(false), 400);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'shinchan' ? 'sunset' : 'shinchan'));
  };

  const isShinchanTheme = theme === 'shinchan';

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-3xl border transition-all duration-500 shadow-xl ${
          isShinchanTheme
            ? 'border-sky-300/80 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white shadow-sky-500/25'
            : 'border-amber-200/70 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-orange-500/30'
        }`}
      >
        {/* Background artwork when in Shinchan theme */}
        {isShinchanTheme ? (
          <>
            {/* Shinchan Sky Illustration Background with gentle overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={shinchanSkyImg}
                alt="Shinchan Blue Sky"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top opacity-35 mix-blend-overlay transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-900/60 to-sky-600/40" />
            </div>

            {/* Glowing anime sun and cloud accents */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-amber-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-300/25 blur-3xl" />
          </>
        ) : (
          <>
            {/* Sunset glow blobs */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl" />
          </>
        )}

        {/* Floating Shinchan Peeking Character at top-right */}
        <div
          onClick={() => setShowPhotoModal(true)}
          role="button"
          tabIndex={0}
          title="Klik untuk lihat foto Shinchan!"
          className={`group absolute -top-1 right-3 z-10 flex cursor-pointer items-center transition-transform active:scale-95 ${
            isBouncing ? 'animate-bounce' : 'hover:-translate-y-0.5'
          }`}
        >
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-white/90 bg-white/30 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300">
              <img
                src={shinchanPeekImg}
                alt="Shinchan Peeking"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Cute zoom / love icon badge */}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold ring-2 ring-white shadow">
              <Maximize2 className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>

        <div className="relative z-10 p-5">
          {/* Top Header bar */}
          <div className="flex items-center justify-between gap-2 pr-20">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-sm border border-white/20">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/85">
                  Periode
                </p>
                <p className="text-sm font-extrabold leading-tight drop-shadow-sm">
                  {periodName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
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
          </div>

          {/* Date chip */}
          <div className="mt-2 flex items-center gap-2">
            {hydrated && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-md border border-white/15 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {todayLabel}
              </span>
            )}
          </div>

          {/* Big numbers row */}
          <div className="mt-4 grid grid-cols-2 gap-3 items-end">
            {/* Sisa Hari */}
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-md border border-white/15 shadow-inner">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/85 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-300" />
                Sisa Hari
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <p className="text-4xl sm:text-5xl font-black tracking-tight leading-none drop-shadow-md">
                  {daysRemaining}
                </p>
                <span className="text-xs font-semibold text-white/90">hari lagi</span>
              </div>
            </div>

            {/* Hari Berjalan */}
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-md border border-white/15 shadow-inner text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/85">
                Hari Berjalan
              </p>
              <div className="mt-1 flex items-baseline justify-end gap-1">
                <p className="text-2xl sm:text-3xl font-black leading-none drop-shadow-md">
                  {daysPassed}
                </p>
                <span className="text-sm font-bold text-white/80">/{daysTotal}</span>
              </div>
              <p className="mt-1 text-[10px] font-bold text-amber-300">
                {progressPercent}% selesai
              </p>
            </div>
          </div>

          {/* Interactive Shinchan Speech Bubble */}
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
              {SHINCHAN_QUOTES[quoteIndex]}
            </p>
            <span className="text-[9px] text-white/70 underline flex-shrink-0">
              ganti pesan
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3.5 space-y-1.5">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/25 backdrop-blur-md border border-white/15 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 shadow-sm ${
                  isShinchanTheme
                    ? 'bg-gradient-to-r from-cyan-300 via-amber-300 to-yellow-400'
                    : 'bg-gradient-to-r from-amber-200 to-white'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-semibold text-white/85">
              <span>Awal Bulan (1)</span>
              <span className="text-amber-200">Hari ke-{daysPassed}</span>
              <span>Akhir Bulan ({daysTotal})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shinchan Full View Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-sky-300/50 bg-slate-950 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowPhotoModal(false)}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md border border-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Shinchan artwork image */}
            <div className="relative max-h-[60vh] w-full overflow-hidden bg-sky-500">
              <img
                src={shinchanSkyImg}
                alt="Crayon Shin-chan Sky"
                referrerPolicy="no-referrer"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            {/* Caption & Shinchan cheer */}
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
                "Halo! Jangan lupa catat pengambilan kateringnya dan nikmati makan siangnya ya, hehehe!"
              </p>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


