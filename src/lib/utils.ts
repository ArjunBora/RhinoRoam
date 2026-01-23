import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getMonthName(month: number): string {
  return MONTH_NAMES[month - 1] || "";
}

export const POI_CATEGORY_ICONS: Record<string, string> = {
  TEMPLE: "🛕",
  FORT: "🏰",
  PALACE: "👑",
  MUSEUM: "🏛️",
  MONUMENT: "🗿",
  NATURE: "🌳",
  MARKET: "🛍️",
  CULTURAL_CENTER: "🎭",
  ARCHAEOLOGICAL: "⚱️",
  RELIGIOUS: "🕌",
  VIEWPOINT: "🏔️",
  WATER_BODY: "💧",
  GARDEN: "🌺",
  OTHER: "📍",
};

export const POI_CATEGORY_LABELS: Record<string, string> = {
  TEMPLE: "Temple",
  FORT: "Fort",
  PALACE: "Palace",
  MUSEUM: "Museum",
  MONUMENT: "Monument",
  NATURE: "Nature",
  MARKET: "Market",
  CULTURAL_CENTER: "Cultural Center",
  ARCHAEOLOGICAL: "Archaeological Site",
  RELIGIOUS: "Religious Site",
  VIEWPOINT: "Viewpoint",
  WATER_BODY: "Water Body",
  GARDEN: "Garden",
  OTHER: "Other",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "bg-green-100 text-green-800",
  MODERATE: "bg-yellow-100 text-yellow-800",
  CHALLENGING: "bg-red-100 text-red-800",
};

export const CROWD_LEVEL_COLORS: Record<string, string> = {
  LOW: "bg-green-100 text-green-800",
  MODERATE: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  PEAK: "bg-red-100 text-red-800",
};
