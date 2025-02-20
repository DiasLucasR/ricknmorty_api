import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

async function getCharacter(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const character = await getCharacter(params.id)

  if (!character) {
    notFound()
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Characters
        </Link>
      </Button>
      <Card className="max-w-2xl mx-auto">
        <div className="md:flex">
          <div className="relative w-full md:w-[300px] h-[300px]">
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <CardTitle className="text-2xl">{character.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge variant={character.status.toLowerCase() === "alive" ? "default" : "destructive"}>
                  {character.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{character.species}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Last known location:</p>
                <p className="text-sm text-muted-foreground">{character.location.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Origin:</p>
                <p className="text-sm text-muted-foreground">{character.origin.name}</p>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </main>
  )
}

