/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, SlidersHorizontal, Plus, UtensilsCrossed } from 'lucide-react';
import {
  CateringItem,
  Category,
  Unit,
  TabKey,
  SortKey,
  ToastMessage,
} from './types';
import { INITIAL_CATERING_ITEMS } from './data/seedData';
import {
  loadSavedState,
  saveState,
  calculatePeriodDays,
  getCurrentMonthPeriod,
} from './lib/storage';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { Header } from './components/Header';
import { CountdownCard } from './components/CountdownCard';
import { SummaryStats } from './components/SummaryStats';
import { CateringCard } from './components/CateringCard';
import { AddCateringModal } from './components/AddCateringModal';
import { FilterDrawer } from './components/FilterDrawer';
import { StatsView } from './components/StatsView';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [hydrated, setHydrated] = useState(false);
  const [period, setPeriod] = useState(getCurrentMonthPeriod());
  const [items, setItems] = useState<CateringItem[]>(INITIAL_CATERING_ITEMS);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedSort, setSelectedSort] = useState<SortKey>('name');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const saved = loadSavedState();
    setPeriod({
      periodName: saved.periodName,
      startDate: saved.startDate,
      endDate: saved.endDate,
    });
    setItems(saved.items);
    setHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!hydrated) return;
    saveState({
      periodName: period.periodName,
      startDate: period.startDate,
      endDate: period.endDate,
      items,
    });
  }, [items, period, hydrated]);

  // Scroll to top on tab switch
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const showToast = (
    title: string,
    description?: string,
    variant: 'default' | 'destructive' | 'success' = 'default'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      description,
      variant,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Period Days calculation
  const periodDays = useMemo(
    () => calculatePeriodDays(period.startDate, period.endDate),
    [period.startDate, period.endDate]
  );

  // Summary statistics
  const stats = useMemo(() => {
    const totalInitial = items.reduce((acc, it) => acc + it.initialQty, 0);
    const totalTaken = items.reduce((acc, it) => acc + it.takenQty, 0);
    const totalRemaining = Math.max(0, totalInitial - totalTaken);
    const avgPerDay =
      periodDays.daysPassed > 0 ? totalTaken / periodDays.daysPassed : 0;

    return {
      itemCount: items.length,
      totalInitial,
      totalTaken,
      totalRemaining,
      avgPerDay,
    };
  }, [items, periodDays.daysPassed]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = items.filter((item) => {
      const matchSearch = !q || item.name.toLowerCase().includes(q);
      const matchCat =
        selectedCategory === 'Semua' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });

    return filtered.sort((a, b) => {
      if (selectedSort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === 'remaining') {
        const remA = Math.max(0, a.initialQty - a.takenQty);
        const remB = Math.max(0, b.initialQty - b.takenQty);
        return remB - remA;
      }
      if (selectedSort === 'taken') {
        return b.takenQty - a.takenQty;
      }
      return 0;
    });
  }, [items, searchQuery, selectedCategory, selectedSort]);

  // Total history count for badge
  const totalHistoryCount = useMemo(() => {
    return items.reduce((acc, it) => acc + it.history.length, 0);
  }, [items]);

  // Actions
  const handleTakeItem = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const newTaken = Math.min(it.initialQty, it.takenQty + qty);
        return {
          ...it,
          takenQty: newTaken,
          history: [
            ...it.history,
            {
              date: new Date().toISOString(),
              qty,
            },
          ].slice(-50),
        };
      })
    );
  };

  const handleRestockItem = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        return {
          ...it,
          initialQty: it.initialQty + qty,
        };
      })
    );
  };

  const handleResetItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        return {
          ...it,
          takenQty: 0,
          history: [],
        };
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleAddItem = (
    name: string,
    initialQty: number,
    unit: Unit,
    category: Category
  ) => {
    const newItem: CateringItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      initialQty,
      takenQty: 0,
      unit,
      category,
      createdAt: new Date().toISOString(),
      history: [],
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleResetAllTaken = () => {
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        takenQty: 0,
        history: [],
      }))
    );
    showToast(
      'Semua pengambilan direset',
      'Semua stok dikembalikan ke jumlah awal.'
    );
  };

  const handleResetToDefault = () => {
    const defaultPeriod = getCurrentMonthPeriod();
    setPeriod(defaultPeriod);
    setItems(INITIAL_CATERING_ITEMS);
    showToast(
      'Data dipulihkan',
      'Data katering telah dikembalikan ke pengaturan awal.',
      'success'
    );
  };

  const activeFilterCount =
    (selectedCategory !== 'Semua' ? 1 : 0) + (selectedSort !== 'name' ? 1 : 0);

  return (
    <main className="relative h-screen h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#fffdf7] text-slate-900 selection:bg-amber-200 selection:text-amber-900">
      {/* Background ambient animations and decoration */}
      <BackgroundDecoration />

      {/* Main Responsive Mobile Frame */}
      <div className="relative mx-auto flex h-full max-h-full w-full max-w-[480px] flex-col overflow-hidden bg-white/30 shadow-[0_8px_40px_-12px_rgba(120,53,15,0.25)] backdrop-blur-sm">
        {/* Sticky Header */}
        <Header
          periodName={period.periodName}
          daysRemaining={periodDays.daysRemaining}
          hydrated={hydrated}
          historyCount={totalHistoryCount}
          onBellClick={() => setActiveTab('history')}
        />

        {/* Scrollable Main Views */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain no-scrollbar"
        >
          {activeTab === 'home' && (
            <div className="space-y-4 px-4 pb-28 pt-4">
              {/* Countdown Banner Card */}
              <CountdownCard
                periodName={period.periodName}
                startDate={period.startDate}
                endDate={period.endDate}
                hydrated={hydrated}
              />

              {/* Horizontal Scroll Stats */}
              <SummaryStats stats={stats} />

              {/* Search Bar & Filter Button */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-500" />
                  <input
                    type="text"
                    placeholder="Cari katering..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-amber-200/60 bg-white/80 pl-10 pr-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 backdrop-blur-md focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 focus:outline-none shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setFilterDrawerOpen(true)}
                  aria-label="Filter dan urutkan"
                  className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-amber-200/60 bg-white/80 text-amber-600 shadow-sm backdrop-blur-md transition-all hover:bg-white active:scale-95"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white shadow-sm">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Active Filter Chips (if any) */}
              {(selectedCategory !== 'Semua' || selectedSort !== 'name') && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {selectedCategory !== 'Semua' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800 border border-amber-200">
                      <span>Kategori: {selectedCategory}</span>
                      <button
                        onClick={() => setSelectedCategory('Semua')}
                        className="ml-0.5 hover:text-amber-950 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedSort !== 'name' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-800 border border-orange-200">
                      <span>
                        Urut:{' '}
                        {selectedSort === 'remaining'
                          ? 'Sisa Terbanyak'
                          : 'Paling Banyak Diambil'}
                      </span>
                      <button
                        onClick={() => setSelectedSort('name')}
                        className="ml-0.5 hover:text-orange-950 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* List of Catering Items */}
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-amber-300/60 bg-white/60 py-12 text-center backdrop-blur-xl">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 ring-4 ring-amber-200/40">
                    <UtensilsCrossed className="h-7 w-7 text-amber-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700">
                    {items.length === 0
                      ? 'Belum ada katering'
                      : 'Tidak ada yang cocok'}
                  </h3>
                  <p className="mt-1 max-w-[240px] text-xs text-slate-500">
                    {items.length === 0
                      ? 'Klik tombol + untuk tambah katering pertama Anda.'
                      : 'Coba ubah kata kunci pencarian atau filter kategori.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <CateringCard
                      key={item.id}
                      item={item}
                      onTake={handleTakeItem}
                      onRestock={handleRestockItem}
                      onReset={handleResetItem}
                      onDelete={handleDeleteItem}
                      hydrated={hydrated}
                      onShowToast={showToast}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <StatsView
              stats={stats}
              items={items}
              daysPassed={periodDays.daysPassed}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView items={items} hydrated={hydrated} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              periodName={period.periodName}
              startDate={period.startDate}
              endDate={period.endDate}
              itemCount={items.length}
              totalInitial={stats.totalInitial}
              onResetAllTaken={handleResetAllTaken}
              onResetToDefault={handleResetToDefault}
            />
          )}
        </div>

        {/* Floating Action Button (+ Tambah Katering) */}
        {(activeTab === 'home' || activeTab === 'history') && (
          <button
            onClick={() => setAddModalOpen(true)}
            aria-label="Tambah katering"
            className="absolute right-4 bottom-20 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-6 w-6" />
          </button>
        )}

        {/* Add Catering Modal */}
        <AddCateringModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddItem}
          onShowToast={showToast}
        />

        {/* Filter Drawer */}
        <FilterDrawer
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setFilterDrawerOpen(false);
          }}
          selectedSort={selectedSort}
          onSelectSort={(sort) => {
            setSelectedSort(sort);
            setFilterDrawerOpen(false);
          }}
          categoryCounts={categoryCounts}
          onResetFilters={() => {
            setSelectedCategory('Semua');
            setSelectedSort('name');
            setSearchQuery('');
            setFilterDrawerOpen(false);
          }}
          hasActiveFilters={activeFilterCount > 0 || !!searchQuery}
        />

        {/* Bottom Navigation */}
        <BottomNav
          active={activeTab}
          onChange={setActiveTab}
          historyBadgeCount={totalHistoryCount}
        />
      </div>

      {/* Floating Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
