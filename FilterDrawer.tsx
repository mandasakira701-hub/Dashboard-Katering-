import React from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Category, SortKey } from '../types';
import { CATEGORIES } from '../data/seedData';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSort: SortKey;
  onSelectSort: (sort: SortKey) => void;
  categoryCounts: Record<string, number>;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedSort,
  onSelectSort,
  categoryCounts,
  onResetFilters,
  hasActiveFilters,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex h-full w-[85vw] max-w-sm flex-col bg-white p-5 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2 text-slate-800">
            <SlidersHorizontal className="h-5 w-5 text-amber-500" />
            <h2 className="text-base font-bold">Filter & Urutkan</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Filter"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* Category Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kategori
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => onSelectCategory('Semua')}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                  selectedCategory === 'Semua'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-amber-50/70 text-slate-700 hover:bg-amber-100/70'
                }`}
              >
                <span>Semua Kategori</span>
              </button>
              {CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-amber-50/70 text-slate-700 hover:bg-amber-100/70'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] font-normal ${
                        isSelected ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Urutkan Berdasarkan
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { key: 'name' as SortKey, label: 'Nama (A-Z)' },
                { key: 'remaining' as SortKey, label: 'Sisa Terbanyak' },
                { key: 'taken' as SortKey, label: 'Paling Banyak Diambil' },
              ].map((sortOption) => {
                const isSelected = selectedSort === sortOption.key;
                return (
                  <button
                    key={sortOption.key}
                    type="button"
                    onClick={() => onSelectSort(sortOption.key)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-orange-50/60 text-slate-700 hover:bg-orange-100/60'
                    }`}
                  >
                    <span>{sortOption.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 py-3 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          )}
        </div>

        <div className="pt-3 border-t border-amber-100">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
};
