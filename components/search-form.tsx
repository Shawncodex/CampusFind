"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [type, setType] = useState(searchParams.get("type") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (type) params.set("type", type)
    if (category) params.set("category", category)

    setTimeout(() => {
      setIsSearching(false)
      router.push(`/search?${params.toString()}`)
    }, 800)
  }

  const clearSearch = () => {
    setQuery("")
    setType("")
    setCategory("")
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for items by name, location, or description..."
            className="pl-9 pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            {isAdvancedSearch ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button type="submit" size="sm" className="ml-auto relative" disabled={isSearching}>
            {isSearching ? (
              <>
                <span className="opacity-0">Search</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </span>
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>

        {isAdvancedSearch && (
          <div className="grid gap-4 pt-2 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lost">Lost Items</SelectItem>
                  <SelectItem value="found">Found Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Documents">Documents</SelectItem>
                  <SelectItem value="Keys">Keys</SelectItem>
                  <SelectItem value="Bags">Bags</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

