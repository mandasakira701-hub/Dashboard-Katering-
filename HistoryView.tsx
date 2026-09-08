import React from 'react';
import { History, Inbox } from 'lucide-react';
import { CateringItem, HistoryRecord } from '../types';

interface HistoryViewProps {
  items: CateringItem[];
  hydrated: boolean;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ items, hydrated }) => {
  // Aggregate all history entries
  const allHistory: HistoryRecord[] = items.flatMap((item) =>
    item.history.map((h, i) => ({
      id: `${item.id}-${h.date}-${i}`,
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      qty: h.qty,
      unit: item.unit,
      date: h.date,
    }))
  );

  // Sort descending by date
  allHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by date in Indonesian
  const grouped: Record<string, HistoryRecord[]> = {};
  allHistory.forEach((record) => {
    const d = new Date(record.date);
    const dateKey = d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(record);
  });

  const dateKeys = Object.keys(grouped);

  if (!hydrated) {
    return (
      <div className="space-y-3 px-4 pb-28 pt-4">
        <div className="h-24 rounded-2xl bg-white/60 backdrop-blur-xl animate-pulse" />
      </div>
    );
  }

  if (allHistory.length === 0) {
    return (
      <div className="px-4 pb-28 pt-4">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-amber-300/60 bg-white/60 py-16 text-center backdrop-blur-xl">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 ring-4 ring-amber-200/40">
            <Inbox className="h-7 w-7 text-amber-500" />
          </div>
          <h3 className="text-base font-semibold text-slate-700">
            Belum ada riwayat
          </h3>
          <p className="mt-1 max-w-xs text-xs text-slate-500">
            Setiap kali Anda mengambil item katering, akan muncul di sini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 pb-28 pt-4">
      <div className="flex items-center gap-2 pt-1">
        <History className="h-5 w-5 text-amber-500" />
        <h2 className="text-sm font-bold text-slate-800">
          Riwayat Pengambilan ({allHistory.length})
        </h2>
      </div>

      {dateKeys.map((dateKey) => {
        const dayRecords = grouped[dateKey];
        const dayTotal = dayRecords.reduce((sum, r) => sum + r.qty, 0);

        return (
          <div key={dateKey} className="space-y-2">
            {/* Sticky Day Header */}
            <div className="sticky top-14 z-10 flex items-center justify-between rounded-full bg-amber-100/90 px-3 py-1.5 backdrop-blur-md shadow-sm border border-amber-200/50">
              <p className="text-[11px] font-bold text-amber-900">{dateKey}</p>
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                {dayTotal} unit
              </span>
            </div>

            {/* List of actions for this day */}
            <div className="space-y-2">
              {dayRecords.map((record) => {
                const timeStr = new Date(record.date).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={record.id}
                    className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-white/80 p-3 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <span className="text-sm font-bold">{record.qty}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {record.itemName}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {record.category} · {record.unit}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] font-semibold text-slate-700">
                        {timeStr}
                      </p>
                      <p className="text-[10px] text-slate-400">diambil</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
