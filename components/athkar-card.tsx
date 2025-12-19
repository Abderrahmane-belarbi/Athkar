"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import type { Athkar } from "@/lib/types"

interface AthkarCardProps {
  athkar: Athkar
}

export function AthkarCard({ athkar }: AthkarCardProps) {
  const { locale } = useI18n()

  const title = athkar.title[locale] || athkar.title.ar
  const totalCount = athkar.phrases.reduce((sum, phrase) => sum + phrase.count, 0)

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{athkar.phrases.length} phrases</Badge>
              <Badge variant="outline">{totalCount} repetitions</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="arabic-text text-lg text-muted-foreground line-clamp-2">{athkar.phrases[0]?.arabic}</div>
          <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
            <Link href={`/athkar/${athkar.id}`}>
              Read & Count
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
