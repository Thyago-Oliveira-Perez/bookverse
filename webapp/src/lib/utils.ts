import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
