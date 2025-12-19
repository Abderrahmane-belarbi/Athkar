import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { AthkarCounter } from "@/components/athkar-counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { athkarData } from "@/lib/athkar-data";
import ResetAthkarButton from "@/components/reset-athkar-button";

export function generateStaticParams() {
  return athkarData.map((athkar) => ({
    id: athkar.id,
  }));
}

export default async function AthkarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const athkar = athkarData.find((a) => String(a.id) === id);

  if (!athkar) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-accent/5">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="/athkar">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {athkar.title.ar}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{athkar.category}</Badge>
                  {athkar.reference && (
                    <Badge variant="outline">{athkar.reference}</Badge>
                  )}
                </div>
              </div>
            </div>
            <ResetAthkarButton />
          </div>

          <div className="space-y-6">
            {athkar.phrases.map((phrase) => (
              <AthkarCounter key={phrase.id} phrase={phrase} />
            ))}
          </div>

          <div className="text-center py-8">
            <p className="text-muted-foreground italic">
              May Allah accept our remembrance and increase us in knowledge
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
