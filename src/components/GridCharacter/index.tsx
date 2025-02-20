"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CharacterCard from "../CardCharacter"
import { useCharacters } from "@/services/hooks"

export default function CharacterGrid() {
  const [page, setPage] = useState(1)
  const { characters, totalPages } = useCharacters(page)
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => router.push(`/character/${character.id}`)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

