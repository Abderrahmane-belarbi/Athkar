"use client";

import { useEffect } from "react";

type Props = {
  /**
   * Key where you store counters/progress.
   * If you store each athkar separately, set that logic below.
   */
  progressKey?: string;

  /**
   * Key to track last reset date (YYYY-MM-DD).
   */
  lastResetKey?: string;

  /**
   * Optional: if true, reloads the page after reset so UI updates immediately.
   * Useful if your counters are read from localStorage on mount.
   */
  reloadAfterReset?: boolean;
};

function getTodayKeyLocal() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // local YYYY-MM-DD
}

function msUntilNextMidnight() {
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
  return nextMidnight.getTime() - now.getTime();
}

export default function MidnightReset({
  progressKey = "athkar-progress",
  lastResetKey = "athkar_last_reset",
  reloadAfterReset = true,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const doReset = () => {
      // ✅ Option A (recommended): wipe progress entirely
      // Your app should then start from fresh counts = 0.
      localStorage.removeItem(progressKey);

      // If you store multiple keys, you can wipe them here too.
      // Example:
      // localStorage.removeItem("morning-progress");
      // localStorage.removeItem("evening-progress");

      if (reloadAfterReset) window.location.reload();
    };

    const resetIfNewDay = () => {
      const today = getTodayKeyLocal();
      const last = localStorage.getItem(lastResetKey);

      if (last !== today) {
        doReset();
        localStorage.setItem(lastResetKey, today);
      }
    };

    // 1) Reset immediately if user opens app after midnight
    resetIfNewDay();

    // 2) Schedule reset exactly at next midnight
    const timeoutId = window.setTimeout(() => {
      resetIfNewDay();

      // Safety: if user keeps app open for days, check every minute after first midnight
      const intervalId = window.setInterval(resetIfNewDay, 60_000);

      // store interval cleanup in closure by returning cleanup below
      (MidnightReset as any).__intervalId = intervalId;
    }, msUntilNextMidnight());

    return () => {
      window.clearTimeout(timeoutId);
      const intervalId = (MidnightReset as any).__intervalId as number | undefined;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [progressKey, lastResetKey, reloadAfterReset]);

  return null; // no UI
}
