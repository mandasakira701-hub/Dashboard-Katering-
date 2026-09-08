import React, { useState } from 'react';
import {
  User,
  Calendar,
  Database,
  Info,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Smile,
} from 'lucide-react';
import shinchanPeekImg from '../assets/images/shinchan_peek_1788907429045.jpg';
import shinchanBentoImg from '../assets/images/shinchan_bento_1788907638534.jpg';

interface ProfileViewProps {
  periodName: string;
  startDate: string;
  endDate: string;
  itemCount: number;
  totalInitial: number;
  onResetAllTaken: () => void;
  onResetToDefault: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  periodName,
  startDate,
  endDate,
  itemCount,
  totalInitial,
  onResetAllTaken,
  onResetToDefault,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);
  const [avatarType, setAvatarType] = useState<'shinchan' | 'user'>('shinchan');

  const infoItems = [
    {
      icon: Calendar,
      label: 'Periode Aktif',
      value: periodName,
      sub: `${startDate} s/d ${endDate}`,
    },
    {
      icon: Database,
      label: 'Jumlah Katering',
      value: `${itemCount} jenis`,
      sub: `${totalInitial} unit total`,
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-28 pt-2">
      {/* Profile Header Card */}
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-amber-200/60 bg-white/80 p-6 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div
          onClick={() => setAvatarType((prev) => (prev === 'shinchan' ? 'user' : 'shinchan'))}
          role="button"
          tabIndex={0}
          title="Klik untuk ganti avatar!"
          className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 active:scale-95"
        >
          {avatarType === 'shinchan' ? (
            <img
              src={shinchanBentoImg}
              alt="Shinchan Avatar"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover border-2 border-white"
            />
          ) : (
            <User className="h-10 w-10" />
          )}
          <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-white" />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-sm border border-white text-[10px]">
            ✨
          </span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-extrabold text-slate-900">
              {avatarType === 'shinchan' ? 'Shinnosuke (Shinchan)' : 'Admin Katering'}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {avatarType === 'shinchan' ? 'Penikmat Bento & Chocobi 🍱' : 'Pengelola Dashboard Katering'}
          </p>
          <button
            type="button"
            onClick={() => setAvatarType((prev) => (prev === 'shinchan' ? 'user' : 'shinchan'))}
            className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 hover:bg-amber-200 transition-colors"
          >
            <Smile className="h-3 w-3" />
            Ganti Avatar ({avatarType === 'shinchan' ? 'Shinchan' : 'Admin'})
          </button>
        </div>
        <div className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-800">
          Periode {periodName}
        </div>
      </div>

      {/* Info List */}
      <div className="space-y-2">
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-white/80 p-3 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>
                <p className="truncate text-sm font-bold text-slate-800">
                  {item.value}
                </p>
                <p className="text-[10px] text-slate-500">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* About Application Card */}
      <div className="rounded-2xl border border-slate-200/60 bg-white/70 p-4 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="mb-2 flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-700">
            Tentang Aplikasi
          </h3>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Dashboard Katering v1.0 — Manajemen stok katering bulanan dengan hitung mundur hari dan pelacakan pengambilan stok otomatis. Data tersimpan lokal di browser Anda.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => setShowConfirmReset(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/70 py-3 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100 active:scale-95 shadow-sm"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Semua Pengambilan</span>
        </button>

        <button
          onClick={() => setShowConfirmRestore(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 py-2.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Kembalikan Data Contoh Bawaan</span>
        </button>
      </div>

      {/* Confirmation Modal for Reset All Taken */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-rose-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-2 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-base font-bold">Reset semua pengambilan?</h3>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Semua jumlah katering yang diambil akan dinolkan kembali ke stok awal dan riwayat pengambilan akan dibersihkan.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetAllTaken();
                  setShowConfirmReset(false);
                }}
                className="flex-1 rounded-xl bg-rose-600 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-rose-700"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Restore Defaults */}
      {showConfirmRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-amber-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-2 text-amber-600">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-base font-bold">Kembalikan data bawaan?</h3>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Ini akan memulihkan 7 katering awal (Katering Asep, Budi, Citra, Dewi, Eka, Fajar, Gita) dan mereset status stok.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmRestore(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetToDefault();
                  setShowConfirmRestore(false);
                }}
                className="flex-1 rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-600"
              >
                Pulihkan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
