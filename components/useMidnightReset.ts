"use client";

import { useEffect } from "react";

type ResetFn = () => void;

/**
 * Resets at local midnight (00:00) using the user's local time.
 * Also resets on app open if the saved reset-day is not today.
 */
export function useMidnightReset(resetAll: ResetFn, key = "athkar_last_reset") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const getTodayKey = () => {
      const now = new Date();
      // YYYY-MM-DD in local time
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    };

    const resetIfNewDay = () => {
      const today = getTodayKey();
      const last = localStorage.getItem(key);

      if (last !== today) {
        resetAll();
        localStorage.setItem(key, today);
      }
    };

    // 1) Reset on open if we already passed midnight
    resetIfNewDay();

    // 2) Schedule reset at next local midnight
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      resetIfNewDay();
      // After first midnight hit, keep checking once per minute (safe & light)
      intervalId = window.setInterval(resetIfNewDay, 60_000);
    }, msUntilMidnight);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [resetAll, key]);
}
