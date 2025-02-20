import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="aspect-square relative">
        <Image
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{character.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge variant={character.status.toLowerCase() === "alive" ? "default" : "destructive"}>
          {character.status}
        </Badge>
        <p className="text-sm text-muted-foreground">{character.species}</p>
      </CardContent>
    </Card>
  )
}

