import React, { useState } from 'react';
import { Plus, UtensilsCrossed, X } from 'lucide-react';
import { Category, Unit } from '../types';
import { CATEGORIES, UNITS } from '../data/seedData';

interface AddCateringModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, qty: number, unit: Unit, category: Category) => void;
  onShowToast: (title: string, description?: string, variant?: 'default' | 'destructive' | 'success') => void;
}

export const AddCateringModal: React.FC<AddCateringModalProps> = ({
  open,
  onClose,
  onAdd,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(50);
  const [unit, setUnit] = useState<Unit>('porsi');
  const [category, setCategory] = useState<Category>('Makanan Pokok');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      onShowToast(
        'Nama katering wajib diisi',
        'Silakan masukkan nama katering.',
        'destructive'
      );
      return;
    }
    if (qty <= 0) {
      onShowToast(
        'Jumlah tidak valid',
        'Jumlah awal harus lebih besar dari 0.',
        'destructive'
      );
      return;
    }

    onAdd(trimmed, qty, unit, category);
    onShowToast(
      'Katering ditambahkan',
      `${trimmed} (${qty} ${unit}) berhasil ditambahkan.`,
      'success'
    );
    setName('');
    setQty(50);
    setUnit('porsi');
    setCategory('Makanan Pokok');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-amber-200/80 bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Tambah Katering
              </h3>
              <p className="text-xs text-slate-500">
                Tambahkan katering baru ke daftar bulan ini.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Nama Katering
            </label>
            <input
              type="text"
              placeholder="Contoh: Katering Asep"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-2xl border border-amber-200/80 bg-white px-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Jumlah Awal
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="h-11 w-full rounded-2xl border border-amber-200/80 bg-white px-3.5 text-sm font-semibold text-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Satuan
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
                className="h-11 w-full rounded-2xl border border-amber-200/80 bg-white px-3 text-sm font-medium text-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none cursor-pointer"
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="h-11 w-full rounded-2xl border border-amber-200/80 bg-white px-3 text-sm font-medium text-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-amber-500 py-3 text-xs font-semibold text-white shadow-md hover:bg-amber-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
