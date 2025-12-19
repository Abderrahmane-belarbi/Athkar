import { Navigation } from "@/components/navigation"
import { AthkarCard } from "@/components/athkar-card"
import { athkarData } from "@/lib/athkar-data"

export default function AthkarPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-accent/5">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Islamic Remembrances</h1>
            <p className="text-lg text-muted-foreground">Browse and read authentic Athkar from the Quran and Sunnah</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {athkarData.map((athkar) => (
              <AthkarCard key={athkar.id} athkar={athkar} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
