"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, User, Clock, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import LoadingScreen from "@/components/loading-screen"
import { recentItems } from "@/lib/data"

export default function ItemPage() {
  const params = useParams() as { id: string }
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  // Ensure the ID is correctly formatted
  const item = recentItems.find((item) => String(item.id) === String(params.id))

  if (!item) {
    return notFound()
  }

  console.log("Params ID:", params.id) // Debugging
  console.log("Item Data:", item) // Debugging

  const statusColor = {
    pending: "bg-yellow-500",
    claimed: "bg-green-500",
    unclaimed: "bg-blue-500",
  }[item.status] || "bg-gray-500"

  const typeLabel = item.type === "lost" ? "Lost" : "Found"
  const typeColor = item.type === "lost" ? "bg-red-500" : "bg-emerald-500"

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {item.image ? (
              <Image
                src={`/${item.image}`} // ✅ Ensure correct path
                alt={item.name}
                width={600} // ✅ Required for Next.js
                height={400} // ✅ Prevents layout shift
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <Image src="/placeholder.svg" alt="Placeholder" width={600} height={400} />
            )}

            <div className="absolute left-3 top-3 flex gap-2">
              <Badge className={`${typeColor} hover:${typeColor}`}>{typeLabel}</Badge>
              <Badge className={`${statusColor} hover:${statusColor}`}>{item.status}</Badge>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-3 top-3 bg-background/80 backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(item.date).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-semibold">Additional Details</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                <dd>{item.category}</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                <dt className="text-sm font-medium text-muted-foreground">Color</dt>
                <dd>{item.color || "Not specified"}</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                <dt className="text-sm font-medium text-muted-foreground">Brand</dt>
                <dd>{item.brand || "Not specified"}</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                <dt className="text-sm font-medium text-muted-foreground">ID Number</dt>
                <dd>{item.id}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="md:col-span-2">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                {item.type === "lost"
                  ? "Contact the person who lost this item"
                  : "Contact the person who found this item"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{item.contactName || "Anonymous"}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.type === "lost"
                    ? "Please contact if you found this item."
                    : "Please contact if you lost this item. You may be asked to provide specific details to verify ownership."}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Contact via Message</Button>
              <Button variant="outline" className="w-full">
                {item.type === "lost" ? "I Found This Item" : "This Is My Item"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
