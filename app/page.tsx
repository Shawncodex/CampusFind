"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, MapPin } from "lucide-react"
import ItemCard from "@/components/item-card"
import SearchForm from "@/components/search-form"
import NotificationBell from "@/components/notification-bell"
import LoadingScreen from "@/components/loading-screen"
import { recentItems } from "@/lib/data"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Campus Lost & Found</h1>
          </div>
          <nav className="flex items-center gap-4">
            <NotificationBell />
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                My Items
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-6 md:py-10">
          <div className="grid gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Find Your Lost Items</h2>
                <p className="text-muted-foreground">Report lost items or browse found items on campus</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/report/lost">
                  <Button className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Report Lost Item
                  </Button>
                </Link>
                <Link href="/report/found">
                  <Button variant="outline" className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit Found Item
                  </Button>
                </Link>
              </div>
            </div>

            <Card className="p-4">
              <SearchForm />
            </Card>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="lost">Lost Items</TabsTrigger>
                <TabsTrigger value="found">Found Items</TabsTrigger>
                <TabsTrigger value="claimed">Claimed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recentItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="lost" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recentItems
                    .filter((item) => item.type === "lost")
                    .map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="found" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recentItems
                    .filter((item) => item.type === "found")
                    .map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="claimed" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recentItems
                    .filter((item) => item.status === "claimed")
                    .map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Campus Lost & Found. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground hover:underline">
              About
            </Link>
            <Link href="/terms" className="hover:text-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

