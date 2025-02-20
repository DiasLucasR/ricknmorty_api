"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export default function TopCharacters() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopCharacters() {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character?page=1")
        const data = await res.json()
        setCharacters(data.results.slice(0, 10))
      } catch (error) {
        console.error("Error fetching top characters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopCharacters()
  }, [])

  if (loading) {
    return <CharactersSkeleton />
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {characters.map((character) => (
        <Link href={`/character/${character.id}`} key={character.id}>
          <Card className="hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-1">{character.name}</h3>
              <Badge variant={character.status.toLowerCase() === "alive" ? "default" : "destructive"}>
                {character.status}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function CharactersSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i}>
          <Skeleton className="aspect-square rounded-t-lg" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

