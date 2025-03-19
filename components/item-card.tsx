"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, MessageCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Item } from "@/lib/types"

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const statusColor = {
    pending: "bg-yellow-500",
    claimed: "bg-green-500",
    unclaimed: "bg-blue-500",
  }[item.status]

  const typeLabel = item.type === "lost" ? "Lost" : "Found"
  const typeColor = item.type === "lost" ? "bg-red-500" : "bg-emerald-500"

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={item.image || `/placeholder.svg?height=200&width=400`}
          alt={item.name}
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
          fill
        />
        <div className="absolute left-2 top-2 flex gap-2">
          <Badge className={`${typeColor} hover:${typeColor}`}>{typeLabel}</Badge>
          <Badge className={`${statusColor} hover:${statusColor}`}>{item.status}</Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-xl">{item.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {item.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Link href={`/items/${item.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          asChild
          className="transition-all hover:bg-secondary-foreground hover:text-secondary"
        >
          <Link href={`/items/${item.id}/contact`}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

