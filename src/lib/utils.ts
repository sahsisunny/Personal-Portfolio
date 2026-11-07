import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Present";
  if (dateString.length === 4) return dateString; // Year only
  try {
    const [year, month] = dateString.split("-");
    if (year && month) {
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
    }
    return dateString;
  } catch {
    return dateString;
  }
}
