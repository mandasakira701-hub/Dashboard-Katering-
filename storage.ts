import { CateringItem, PeriodInfo } from '../types';
import { INITIAL_CATERING_ITEMS } from '../data/seedData';

const MONTH_NAMES_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const DAY_NAMES_ID = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export function getCurrentMonthPeriod(date: Date = new Date()): PeriodInfo {
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const pad = (n: number) => String(n).padStart(2, '0');

  return {
    periodName: `${MONTH_NAMES_ID[month]} ${year}`,
    startDate: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`,
    endDate: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`,
  };
}

export function formatIndonesianDate(date: Date): string {
  const dayName = DAY_NAMES_ID[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTH_NAMES_ID[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
}

export function calculatePeriodDays(startDateStr: string, endDateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDateStr);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDateStr);
  end.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;

  const daysTotal = Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
  const daysPassed = Math.max(1, Math.min(daysTotal, Math.round((today.getTime() - start.getTime()) / msPerDay) + 1));
  const daysRemaining = Math.max(0, Math.round((end.getTime() - today.getTime()) / msPerDay));
  const progressPercent = Math.min(100, Math.round((daysPassed / daysTotal) * 100));

  return {
    daysTotal,
    daysPassed,
    daysRemaining,
    progressPercent,
    todayLabel: formatIndonesianDate(today),
  };
}

export const STORAGE_KEY = 'catering-dashboard-storage';

export interface StorageState {
  periodName: string;
  startDate: string;
  endDate: string;
  items: CateringItem[];
}

export function loadSavedState(): StorageState {
  const defaultPeriod = getCurrentMonthPeriod();
  const defaultState: StorageState = {
    ...defaultPeriod,
    items: INITIAL_CATERING_ITEMS,
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    // Support both standard { state: ... } format from zustand persist and direct state
    const data = parsed.state || parsed;

    if (data && Array.isArray(data.items) && data.items.length > 0) {
      return {
        periodName: data.periodName || defaultPeriod.periodName,
        startDate: data.startDate || defaultPeriod.startDate,
        endDate: data.endDate || defaultPeriod.endDate,
        items: data.items,
      };
    }
    return defaultState;
  } catch (err) {
    console.error('Error loading saved catering data:', err);
    return defaultState;
  }
}

export function saveState(state: StorageState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, version: 0 }));
  } catch (err) {
    console.error('Error saving catering data:', err);
  }
}
