"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

export default function TopLocations() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopLocations() {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/location?page=1")
        const data = await res.json()
        setLocations(data.results.slice(0, 10))
      } catch (error) {
        console.error("Error fetching top locations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopLocations()
  }, [])

  if (loading) {
    return <LocationsSkeleton />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {locations.map((location) => (
        <Link href={`/locations/${location.id}`} key={location.id}>
          <Card className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="line-clamp-1">{location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>{location.type}</Badge>
              <p className="text-sm text-muted-foreground mt-2">{location.dimension}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function LocationsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

