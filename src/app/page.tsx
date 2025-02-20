import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import TopCharacters from "@/components/TopCharacters"
import TopLocations from "@/components/TopLocations"


export default function HomePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Rick and Morty Universe</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Explore the multiverse of characters and locations from the hit animated series.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/characters">
              <Users className="mr-2 h-4 w-4" />
              All Characters
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/locations">
              <MapPin className="mr-2 h-4 w-4" />
              All Locations
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>About Rick and Morty</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Rick and Morty is an animated science fiction sitcom that follows the misadventures of cynical mad
              scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith across an infinite number of
              realities.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Top 10 Characters</h2>
        <TopCharacters />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Top 10 Locations</h2>
        <TopLocations />
      </section>
    </main>
  )
}

