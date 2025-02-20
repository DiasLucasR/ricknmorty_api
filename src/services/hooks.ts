"use client"

import { useState, useEffect } from "react"

interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface ApiResponse {
  info: {
    pages: number
  }
  results: Character[]
}

interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
}

interface LocationApiResponse {
  info: {
    pages: number
  }
  results: Location[]
}

export function useCharacters(page: number) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const data: ApiResponse = await res.json()
        setCharacters(data.results)
        setTotalPages(data.info.pages)
      } catch (error) {
        console.error("Error fetching characters:", error)
        setCharacters([])
      }
    }

    fetchCharacters()
  }, [page])

  return { characters, totalPages }
}

export function useLocations(page: number) {
  const [locations, setLocations] = useState<Location[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
        const data: LocationApiResponse = await res.json()
        setLocations(data.results)
        setTotalPages(data.info.pages)
      } catch (error) {
        console.error("Error fetching locations:", error)
        setLocations([])
      }
    }

    fetchLocations()
  }, [page])

  return { locations, totalPages }
}

