"use client";

import { resetAthkarProgress } from "@/lib/athkar-reset";
import { useI18n } from "./i18n-provider";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export default function ResetAthkarButton() {
  const onReset = () => {
    const ok = confirm("Reset all counters?");
    if (!ok) return;

    resetAthkarProgress("athkar-progress", "athkar_last_reset");
  };
  const { locale, t } = useI18n();
  return (
    <Button onClick={onReset} variant="outline" size="icon">
      <RotateCcw className="h-4 w-4" />
      <span className="sr-only">{t("counter.reset")}</span>
    </Button>
  );
}
