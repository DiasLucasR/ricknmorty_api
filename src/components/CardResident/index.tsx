import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

async function getResident(url: string) {
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

async function ResidentCard({ url }: { url: string }) {
  const resident = await getResident(url)

  if (!resident) return null

  return (
    <Link href={`/character/${resident.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4 p-4">
          <div className="relative w-12 h-12">
            <Image
              src={resident.image || "/placeholder.svg"}
              alt={resident.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="font-medium line-clamp-1">{resident.name}</p>
            <Badge variant={resident.status.toLowerCase() === "alive" ? "default" : "destructive"}>
              {resident.status}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  )
}

function ResidentCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center space-x-4 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </Card>
  )
}

export default function ResidentsList({ residentUrls }: { residentUrls: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {residentUrls.map((url) => (
        <Suspense key={url} fallback={<ResidentCardSkeleton />}>
          <ResidentCard url={url} />
        </Suspense>
      ))}
    </div>
  )
}

