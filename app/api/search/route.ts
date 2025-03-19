import { NextResponse } from "next/server"
import { recentItems } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const type = searchParams.get("type")
  const category = searchParams.get("category")

  let results = [...recentItems]

  // Filter by search query
  if (query) {
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Filter by type (lost or found)
  if (type && (type === "lost" || type === "found")) {
    results = results.filter((item) => item.type === type)
  }

  // Filter by category
  if (category) {
    results = results.filter((item) => item.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json({ results })
}

