import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resetAthkarProgress(progressKey = "athkar-progress", lastResetKey = "athkar_last_reset") {
  // wipe progress
  localStorage.removeItem(progressKey);

  // update last reset to today so it won't instantly reset again
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${d}`;

  localStorage.setItem(lastResetKey, today);
}
