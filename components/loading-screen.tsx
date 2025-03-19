"use client"

import { MapPin } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <MapPin className="h-12 w-12 text-primary animate-pulse" />
        </div>
        <div className="text-xl font-bold">Loading...</div>
        <div className="mt-2 text-sm text-muted-foreground">Campus Lost & Found Portal</div>
      </div>
    </div>
  )
}

