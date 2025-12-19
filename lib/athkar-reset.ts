export function resetAthkarProgress(
  progressKey = "athkar-progress",
  lastResetKey = "athkar_last_reset"
) {
  localStorage.removeItem(progressKey);

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${d}`;

  localStorage.setItem(lastResetKey, today);

  // ✅ Notify UI without reload (prevents hydration issues)
  window.dispatchEvent(new Event("athkar:reset"));
}
