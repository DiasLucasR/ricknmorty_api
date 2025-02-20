"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocationCard from "../CardLocation"
import { useLocations } from "@/services/hooks"

export default function LocationGrid() {
  const [page, setPage] = useState(1)
  const { locations, totalPages } = useLocations(page)
  const router = useRouter()

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onClick={() => router.push(`/locations/${location.id}`)}
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

