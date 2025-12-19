import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { BookOpen, Moon, SunIcon, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-accent/5">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4">
              <span className="text-4xl">﷽</span>
            </div>
            <h1 className="font-noto text-4xl md:text-6xl font-bold text-balance">أذكـــار الـمسلم</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance font-amiri-quran">من أذكار الكتاب والسنة</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Remember Allah with beautiful Islamic remembrances and supplications. Track your progress with interactive
              counters and read in Arabic, English, or French.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/athkar">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Athkar
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Link href="/dashboard">
                <Sparkles className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 w-full">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-2">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Authentic Athkar</h3>
                <p className="text-sm text-muted-foreground">
                  From Quran and authentic Hadith sources with transliteration and translations
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-2">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Smart Counters</h3>
                <p className="text-sm text-muted-foreground">
                  Track your repetitions with interactive counters that save your progress
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-2">
                  <div className="flex gap-1">
                    <SunIcon className="h-5 w-5" />
                    <Moon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">Multi-language</h3>
                <p className="text-sm text-muted-foreground">
                  Available in Arabic, English, and French with dark and light modes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>اللهم اجعله في ميزان حسناتنا • May Allah accept our remembrance</p>
        </div>
      </footer>
    </div>
  )
}
