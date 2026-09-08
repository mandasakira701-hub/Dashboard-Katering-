export type Category = 
  | 'Makanan Pokok'
  | 'Lauk'
  | 'Sayuran'
  | 'Minuman'
  | 'Snack'
  | 'Dessert'
  | 'Lainnya';

export type Unit =
  | 'porsi'
  | 'box'
  | 'bungkus'
  | 'botol'
  | 'gelas'
  | 'mangkok'
  | 'potong'
  | 'kg'
  | 'liter'
  | 'pcs';

export interface HistoryRecord {
  id?: string;
  itemId?: string;
  itemName?: string;
  category?: Category;
  unit?: Unit;
  date: string; // ISO string
  qty: number;
}

export interface CateringItem {
  id: string;
  name: string;
  initialQty: number;
  takenQty: number;
  unit: Unit;
  category: Category;
  createdAt: string;
  history: {
    date: string;
    qty: number;
  }[];
}

export interface PeriodInfo {
  periodName: string;
  startDate: string;
  endDate: string;
}

export interface SummaryStatsData {
  itemCount: number;
  totalInitial: number;
  totalTaken: number;
  totalRemaining: number;
  avgPerDay: number;
}

export type TabKey = 'home' | 'stats' | 'history' | 'profile';

export type SortKey = 'name' | 'remaining' | 'taken';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}
