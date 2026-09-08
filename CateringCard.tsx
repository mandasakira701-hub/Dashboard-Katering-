import React, { useState } from 'react';
import {
  Utensils,
  ChevronRight,
  Plus,
  RotateCcw,
  Trash2,
  AlertTriangle,
  MinusCircle,
  PackagePlus,
} from 'lucide-react';
import { CateringItem } from '../types';
import { CATEGORY_COLORS } from '../data/seedData';

interface CateringCardProps {
  item: CateringItem;
  onTake: (id: string, qty: number) => void;
  onRestock: (id: string, qty: number) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  hydrated: boolean;
  onShowToast: (title: string, description?: string, variant?: 'default' | 'destructive' | 'success') => void;
}

export const CateringCard: React.FC<CateringCardProps> = ({
  item,
  onTake,
  onRestock,
  onReset,
  onDelete,
  hydrated,
  onShowToast,
}) => {
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [takeQty, setTakeQty] = useState(1);
  const [restockQty, setRestockQty] = useState(10);

  const remaining = Math.max(0, item.initialQty - item.takenQty);
  const percentTaken = item.initialQty > 0 ? Math.round((item.takenQty / item.initialQty) * 100) : 0;
  const isOutOfStock = remaining <= 0;
  const isLowStock = remaining > 0 && (100 - percentTaken <= 20);

  const categoryColorClass =
    CATEGORY_COLORS[item.category] || 'bg-slate-100 text-slate-800 border-slate-200';

  const handleTakeOne = () => {
    if (remaining <= 0) {
      onShowToast(
        'Stok habis',
        `${item.name} sudah habis. Silakan tambah stok.`,
        'destructive'
      );
      return;
    }
    onTake(item.id, 1);
    onShowToast(
      'Berhasil diambil',
      `1 ${item.unit} ${item.name} diambil. Sisa ${Math.max(0, remaining - 1)} ${item.unit}.`,
      'success'
    );
  };

  const handleTakeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (takeQty <= 0) return;
    if (takeQty > remaining) {
      onShowToast(
        'Jumlah melebihi sisa',
        `Sisa stok ${item.name} hanya ${remaining} ${item.unit}.`,
        'destructive'
      );
      return;
    }
    onTake(item.id, takeQty);
    onShowToast(
      'Berhasil diambil',
      `${takeQty} ${item.unit} ${item.name} diambil. Sisa ${Math.max(0, remaining - takeQty)} ${item.unit}.`,
      'success'
    );
    setShowTakeModal(false);
    setTakeQty(1);
  };

  const handleRestock = (e: React.FormEvent) => {
    e.preventDefault();
    if (restockQty <= 0) return;
    onRestock(item.id, restockQty);
    onShowToast(
      'Stok ditambah',
      `Berhasil menambahkan ${restockQty} ${item.unit} pada ${item.name}.`,
      'success'
    );
    setShowRestockModal(false);
    setRestockQty(10);
  };

  const handleResetItem = () => {
    onReset(item.id);
    onShowToast('Item direset', `Pengambilan ${item.name} dinolkan.`);
  };

  const handleDeleteItem = () => {
    onDelete(item.id);
    onShowToast('Katering dihapus', `${item.name} berhasil dihapus dari daftar.`);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl border bg-white/85 p-3.5 backdrop-blur-xl shadow-sm transition-all active:scale-[0.99] supports-[backdrop-filter]:bg-white/70 ${
          isOutOfStock
            ? 'border-rose-200/80'
            : isLowStock
            ? 'border-amber-200/80'
            : 'border-slate-200/60'
        }`}
      >
        {/* Color bar indicator on left side */}
        <div
          className={`absolute left-0 top-0 h-full w-1 ${
            isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
        />

        <div className="relative pl-1.5">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center rounded-md border px-1.5 py-0 text-[10px] font-medium ${categoryColorClass}`}
                >
                  {item.category}
                </span>

                {isOutOfStock && (
                  <span className="inline-flex items-center rounded-md bg-rose-100 text-rose-700 border border-rose-200 px-1.5 py-0 text-[10px] font-semibold">
                    Habis
                  </span>
                )}

                {!isOutOfStock && isLowStock && (
                  <span className="inline-flex items-center rounded-md bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0 text-[10px] font-semibold">
                    Menipis
                  </span>
                )}
              </div>

              <h3 className="truncate text-sm font-bold text-slate-900">{item.name}</h3>

              {hydrated && item.history.length > 0 && (
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {item.history.length}x diambil
                </p>
              )}
            </div>

            <div className="text-right flex-shrink-0">
              <p
                className={`text-2xl font-extrabold leading-none ${
                  isOutOfStock
                    ? 'text-rose-600'
                    : isLowStock
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {remaining}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                / {item.initialQty} {item.unit}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2.5 space-y-1">
            <div
              className={`h-1.5 w-full overflow-hidden rounded-full ${
                isOutOfStock ? 'bg-rose-100' : isLowStock ? 'bg-amber-100' : 'bg-emerald-100'
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${percentTaken}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>{item.takenQty} diambil</span>
              <span>{percentTaken}%</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-3 flex items-center gap-1.5">
            <button
              onClick={handleTakeOne}
              disabled={isOutOfStock}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-orange-500 py-2 px-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Utensils className="h-3.5 w-3.5" />
              <span>Ambil 1</span>
            </button>

            <button
              onClick={() => {
                setTakeQty(Math.min(remaining, Math.max(1, Math.round(remaining / 4) || 1)));
                setShowTakeModal(true);
              }}
              disabled={isOutOfStock}
              className="flex items-center justify-center gap-1 rounded-xl border border-amber-200/80 bg-white/70 py-2 px-3 text-xs font-semibold text-orange-600 transition-all hover:bg-amber-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Ambil Banyak</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bottom quick utilities */}
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setRestockQty(10);
                  setShowRestockModal(true);
                }}
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                <Plus className="h-3 w-3" />
                <span>Stok</span>
              </button>

              <button
                onClick={handleResetItem}
                disabled={item.takenQty === 0}
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-semibold text-amber-600 transition-colors hover:bg-amber-50 disabled:opacity-40 disabled:pointer-events-none"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            <button
              onClick={() => setShowDeleteModal(true)}
              aria-label="Hapus katering"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-rose-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Ambil Banyak */}
      {showTakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-amber-200/80 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <MinusCircle className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Ambil {item.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Sisa stok: <span className="font-semibold text-slate-700">{remaining} {item.unit}</span>. Masukkan jumlah yang ingin diambil.
            </p>

            <form onSubmit={handleTakeCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Jumlah Ambil ({item.unit})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTakeQty((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-slate-700 font-bold hover:bg-amber-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={remaining}
                    value={takeQty}
                    onChange={(e) => setTakeQty(Number(e.target.value))}
                    className="h-10 flex-1 rounded-xl border border-amber-200/80 px-3 text-center text-base font-bold text-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setTakeQty((q) => Math.min(remaining, q + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-slate-700 font-bold hover:bg-amber-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick pills for convenience */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[5, 10, 20, remaining].map((preset, idx) => {
                  if (preset > remaining || preset <= 0) return null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTakeQty(preset)}
                      className="rounded-lg border border-amber-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-50"
                    >
                      {preset === remaining ? `Semua (${preset})` : `+${preset}`}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTakeModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={takeQty <= 0 || takeQty > remaining}
                  className="flex-1 rounded-xl bg-orange-500 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-orange-600 disabled:opacity-50"
                >
                  Ambil Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Restock / Tambah Stok */}
      {showRestockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-amber-200/80 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <PackagePlus className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Tambah Stok - {item.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Stok awal: <span className="font-semibold text-slate-700">{item.initialQty} {item.unit}</span>. Tambah jumlah unit stok untuk periode ini.
            </p>

            <form onSubmit={handleRestock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Jumlah Tambahan ({item.unit})
                </label>
                <input
                  type="number"
                  min={1}
                  value={restockQty}
                  onChange={(e) => setRestockQty(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-amber-200/80 px-3 text-base font-bold text-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
                />
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-1.5">
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setRestockQty(preset)}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                  >
                    +{preset} {item.unit}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={restockQty <= 0}
                  className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50"
                >
                  + Tambah Stok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirm Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-rose-200 bg-white p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-2 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-base font-bold">Hapus katering?</h3>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Katering <span className="font-semibold text-slate-800">"{item.name}"</span> beserta riwayat pengambilannya akan dihapus permanen.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteItem}
                className="flex-1 rounded-xl bg-rose-600 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-rose-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
