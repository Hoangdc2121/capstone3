// Hàm cn() ghép class, đã có
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Ghép class và xử lý các class Tailwind bị trùng
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
