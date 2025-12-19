"use client"

import * as React from "react"
import { Navigation } from "@/components/navigation"
import { AthkarForm } from "@/components/athkar-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { athkarData } from "@/lib/athkar-data"
import type { Athkar } from "@/lib/types"
import Link from "next/link"

export default function DashboardPage() {
  const { t, locale } = useI18n()
  const [athkarList, setAthkarList] = React.useState<Athkar[]>([])
  const [isCreating, setIsCreating] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem("custom-athkar")
    if (stored) {
      setAthkarList(JSON.parse(stored))
    } else {
      setAthkarList(athkarData)
    }
  }, [])

  const saveToStorage = (data: Athkar[]) => {
    localStorage.setItem("custom-athkar", JSON.stringify(data))
    setAthkarList(data)
  }

  const handleCreate = (athkar: Athkar) => {
    const updated = [...athkarList, athkar]
    saveToStorage(updated)
    setIsCreating(false)
  }

  const handleUpdate = (athkar: Athkar) => {
    const updated = athkarList.map((a) => (a.id === athkar.id ? athkar : a))
    saveToStorage(updated)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this Athkar?")) {
      const updated = athkarList.filter((a) => a.id !== id)
      saveToStorage(updated)
    }
  }

  const editingAthkar = editingId ? athkarList.find((a) => a.id === editingId) : undefined

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t("dashboard.create")}</h1>
            <AthkarForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
          </div>
        </main>
      </div>
    )
  }

  if (editingAthkar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t("dashboard.edit")}</h1>
            <AthkarForm initialData={editingAthkar} onSubmit={handleUpdate} onCancel={() => setEditingId(null)} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">{t("dashboard.title")}</h1>
              <p className="text-lg text-muted-foreground">Create and manage your Athkar collection</p>
            </div>
            <Button onClick={() => setIsCreating(true)} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              {t("dashboard.create")}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {athkarList.map((athkar) => (
              <Card key={athkar.id} className="group hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{athkar.title[locale] || athkar.title.ar}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{athkar.phrases.length} phrases</Badge>
                    <Badge variant="outline">{athkar.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="arabic-text text-sm text-muted-foreground line-clamp-2">
                      {athkar.phrases[0]?.arabic}
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Link href={`/athkar/${athkar.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingId(athkar.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(athkar.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
