import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import ResidentsList from "@/components/CardResident"

async function getLocation(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function LocationPage({ params }: { params: { id: string } }) {
  const location = await getLocation(params.id)

  if (!location) {
    notFound()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/locations">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Locations
        </Link>
      </Button>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{location.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Badge>{location.type}</Badge>
              <p className="text-sm text-muted-foreground">{location.dimension}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Residents</h2>
            <ResidentsList residentUrls={location.residents} />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

