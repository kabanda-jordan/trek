import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function getVehicleTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    CAR: "Car",
    SUV: "SUV",
    SAFARI_VEHICLE: "Safari Vehicle",
    VAN: "Van",
    MINIBUS: "Minibus",
    LUXURY: "Luxury",
  };
  return labels[type] || type;
}

export function getDifficultyLabel(level: string): string {
  const labels: Record<string, string> = {
    EASY: "Easy",
    MODERATE: "Moderate",
    CHALLENGING: "Challenging",
    STRENUOUS: "Strenuous",
  };
  return labels[level] || level;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "text-yellow-600 bg-yellow-50",
    CONFIRMED: "text-blue-600 bg-blue-50",
    COMPLETED: "text-green-600 bg-green-50",
    CANCELLED: "text-red-600 bg-red-50",
    UNPAID: "text-red-600 bg-red-50",
    PAID: "text-green-600 bg-green-50",
    PARTIAL: "text-yellow-600 bg-yellow-50",
    REFUNDED: "text-gray-600 bg-gray-50",
  };
  return colors[status] || "text-gray-600 bg-gray-50";
}
