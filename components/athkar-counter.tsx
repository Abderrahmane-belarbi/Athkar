"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Check } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { AthkarPhrase } from "@/lib/types";

interface AthkarCounterProps {
  phrase: AthkarPhrase;
  onComplete?: (phraseId: string) => void;
}

export function AthkarCounter({ phrase, onComplete }: AthkarCounterProps) {
  const { locale, t } = useI18n();
  const [count, setCount] = React.useState(phrase.count);

  React.useEffect(() => {
    const handler = () => {
      // reset this counter back to its default value
      setCount(phrase.count);
    };

    window.addEventListener("athkar:reset", handler);
    return () => window.removeEventListener("athkar:reset", handler);
  }, [phrase.count]);

  React.useEffect(() => {
    const saved = localStorage.getItem(`athkar-${phrase.id}`);
    if (saved) setCount(Number.parseInt(saved, 10));
  }, [phrase.id]);

  const isCompleted = count === 0;
  const progress = ((phrase.count - count) / phrase.count) * 100;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`athkar-${phrase.id}`, count.toString());
    }
    if (count === 0 && onComplete) {
      onComplete(phrase.id);
    }
  }, [count, phrase.id, onComplete]);

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCount(phrase.count);
  };

  return (
    <Card
      className={`transition-all duration-300 ${
        isCompleted ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t("athkar.repeat")} {phrase.count} {t("athkar.times")}
          </CardTitle>
          {isCompleted && (
            <Badge variant="default" className="gap-1">
              <Check className="h-3 w-3" />
              {t("counter.completed")}
            </Badge>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="font-amiri text-3xl leading-loose cursor-pointer select-none transition-transform active:scale-95"
          onClick={handleDecrement}
        >
          {phrase.arabic}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p className="italic">{phrase.transliteration}</p>
          <p>
            {locale === "en" ? phrase.translation.en : phrase.translation.fr}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <Button
            onClick={handleDecrement}
            disabled={isCompleted}
            size="lg"
            className="flex-1 text-lg font-semibold"
          >
            <span className="text-2xl">{count}</span>
            <span className="ml-2 text-sm font-normal">
              {t("counter.remaining")}
            </span>
          </Button>
          <Button onClick={handleReset} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">{t("counter.reset")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
