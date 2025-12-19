"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import type { Athkar, AthkarPhrase } from "@/lib/types"

interface AthkarFormProps {
  initialData?: Athkar
  onSubmit: (data: Athkar) => void
  onCancel: () => void
}

export function AthkarForm({ initialData, onSubmit, onCancel }: AthkarFormProps) {
  const { t } = useI18n()
  const [titleAr, setTitleAr] = React.useState(initialData?.title.ar || "")
  const [titleEn, setTitleEn] = React.useState(initialData?.title.en || "")
  const [titleFr, setTitleFr] = React.useState(initialData?.title.fr || "")
  const [category, setCategory] = React.useState(initialData?.category || "")
  const [reference, setReference] = React.useState(initialData?.reference || "")
  const [phrases, setPhrases] = React.useState<AthkarPhrase[]>(
    initialData?.phrases || [
      {
        id: crypto.randomUUID(),
        arabic: "",
        transliteration: "",
        translation: { en: "", fr: "" },
        count: 1,
      },
    ],
  )

  const handleAddPhrase = () => {
    setPhrases([
      ...phrases,
      {
        id: crypto.randomUUID(),
        arabic: "",
        transliteration: "",
        translation: { en: "", fr: "" },
        count: 1,
      },
    ])
  }

  const handleRemovePhrase = (id: string) => {
    if (phrases.length > 1) {
      setPhrases(phrases.filter((p) => p.id !== id))
    }
  }

  const handlePhraseChange = (id: string, field: string, value: string | number) => {
    setPhrases(
      phrases.map((p) => {
        if (p.id === id) {
          if (field === "translation.en") {
            return { ...p, translation: { ...p.translation, en: value as string } }
          }
          if (field === "translation.fr") {
            return { ...p, translation: { ...p.translation, fr: value as string } }
          }
          return { ...p, [field]: value }
        }
        return p
      }),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const athkar: Athkar = {
      id: initialData?.id || crypto.randomUUID(),
      title: {
        ar: titleAr,
        en: titleEn,
        fr: titleFr,
      },
      category,
      phrases,
      reference: reference || undefined,
    }
    onSubmit(athkar)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("form.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title-ar">{t("form.title")} (Arabic)</Label>
            <Input
              id="title-ar"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="أذكار..."
              className="arabic-text"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title-en">{t("form.title")} (English)</Label>
              <Input
                id="title-en"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Morning Remembrance..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title-fr">{t("form.title")} (Français)</Label>
              <Input
                id="title-fr"
                value={titleFr}
                onChange={(e) => setTitleFr(e.target.value)}
                placeholder="Invocations du Matin..."
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">{t("form.category")}</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="daily, sleep, prayer..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Sahih Muslim, Hisnul Muslim..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Phrases</h3>
          <Button type="button" onClick={handleAddPhrase} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t("form.add_phrase")}
          </Button>
        </div>

        {phrases.map((phrase, index) => (
          <Card key={phrase.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Phrase {index + 1}</CardTitle>
                {phrases.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemovePhrase(phrase.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("form.phrase")} (Arabic)</Label>
                <textarea
                  value={phrase.arabic}
                  onChange={(e) => handlePhraseChange(phrase.id, "arabic", e.target.value)}
                  className="w-full min-h-24 px-3 py-2 border border-input rounded-md arabic-text"
                  placeholder="أَعُوذُ بِاللَّهِ..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>{t("form.transliteration")}</Label>
                <Input
                  value={phrase.transliteration}
                  onChange={(e) => handlePhraseChange(phrase.id, "transliteration", e.target.value)}
                  placeholder="A'udhu billah..."
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t("form.translation")} (English)</Label>
                  <textarea
                    value={phrase.translation.en}
                    onChange={(e) => handlePhraseChange(phrase.id, "translation.en", e.target.value)}
                    className="w-full min-h-20 px-3 py-2 border border-input rounded-md"
                    placeholder="I seek refuge with Allah..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t("form.translation")} (Français)</Label>
                  <textarea
                    value={phrase.translation.fr}
                    onChange={(e) => handlePhraseChange(phrase.id, "translation.fr", e.target.value)}
                    className="w-full min-h-20 px-3 py-2 border border-input rounded-md"
                    placeholder="Je cherche refuge auprès d'Allah..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("form.count")}</Label>
                <Input
                  type="number"
                  value={phrase.count}
                  onChange={(e) => handlePhraseChange(phrase.id, "count", Number.parseInt(e.target.value, 10))}
                  min="1"
                  max="1000"
                  required
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit" size="lg" className="flex-1">
          {t("form.save")}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel}>
          {t("form.cancel")}
        </Button>
      </div>
    </form>
  )
}
