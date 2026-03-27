import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatVolume(value: string) {
  const map: Record<string, string> = {
    under_10k: "Under R10,000",
    "10k_50k": "R10,000 – R50,000",
    "50k_200k": "R50,000 – R200,000",
    "200k_500k": "R200,000 – R500,000",
    "500k_plus": "R500,000+",
  };
  return map[value] ?? value;
}

export function formatBusinessType(value: string) {
  const map: Record<string, string> = {
    retail: "Retail",
    food_beverage: "Food & Beverage",
    services: "Services",
    automotive: "Automotive",
    health_beauty: "Health & Beauty",
    hospitality: "Hospitality",
    other: "Other",
  };
  return map[value] ?? value;
}
