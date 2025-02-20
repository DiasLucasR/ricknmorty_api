import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
}

interface LocationCardProps {
  location: Location
  onClick: () => void
}

export default function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardHeader>
        <CardTitle className="line-clamp-1">{location.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Badge>{location.type}</Badge>
          <p className="text-sm text-muted-foreground">{location.dimension}</p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          {location.residents.length} Residents
        </div>
      </CardContent>
    </Card>
  )
}

