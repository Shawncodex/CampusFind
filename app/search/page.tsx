"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import SearchForm from "@/components/search-form"
import ItemCard from "@/components/item-card"
import type { Item } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const type = searchParams.get("type")
  const category = searchParams.get("category")

  const [results, setResults] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)

      const params = new URLSearchParams()
      if (query) params.set("q", query)
      if (type) params.set("type", type)
      if (category) params.set("category", category)

      try {
        const response = await fetch(`/api/search?${params.toString()}`)
        const data = await response.json()
        setResults(data.results)
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, type, category])

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">{query ? `Showing results for "${query}"` : "Browse all items"}</p>
        </div>

        <Card className="p-6">
          <SearchForm />
        </Card>

        <div>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading results...</p>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Found {results.length} {results.length === 1 ? "item" : "items"}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
              <h2 className="text-xl font-semibold">No items found</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/">View All Items</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

