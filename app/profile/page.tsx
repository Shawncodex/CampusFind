"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import DashboardLayout from "@/app/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Settings, LogOut, Bell, Eye } from "lucide-react"
import { recentItems } from "@/lib/data"
import ItemCard from "@/components/item-card"
import LoadingScreen from "@/components/loading-screen"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
    joinDate: "January 2023",
  }

  // Filter items for this user (in a real app, this would come from the database)
  const myLostItems = recentItems.filter((item) => item.type === "lost" && item.contactName === "Alex Johnson")
  const myFoundItems = recentItems.filter((item) => item.type === "found" && item.contactName === "Alex Johnson")
  const myClaimedItems = recentItems.filter((item) => item.status === "claimed" && item.contactName === "Alex Johnson")

  return (
    <DashboardLayout>
      <div className="container py-10">
        <div className="mb-8 md:hidden">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Member since {user.joinDate}</p>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <Link href="/profile/settings">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                    </Link>
                    <Link href="/profile/notifications">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Lost Items</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      {myLostItems.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Found Items</span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      {myFoundItems.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Claimed Items</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {myClaimedItems.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="lost" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lost">My Lost Items</TabsTrigger>
                <TabsTrigger value="found">My Found Items</TabsTrigger>
                <TabsTrigger value="claimed">Claimed Items</TabsTrigger>
              </TabsList>
              <TabsContent value="lost" className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Items You've Reported as Lost</h3>
                  <Link href="/report/lost">
                    <Button size="sm">Report New Lost Item</Button>
                  </Link>
                </div>
                {myLostItems.length > 0 ? (
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {myLostItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Eye className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No Lost Items</h3>
                    <p className="mt-2 text-sm text-muted-foreground">You haven't reported any lost items yet.</p>
                    <Link href="/report/lost" className="mt-4">
                      <Button>Report a Lost Item</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="found" className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Items You've Found</h3>
                  <Link href="/report/found">
                    <Button size="sm">Submit New Found Item</Button>
                  </Link>
                </div>
                {myFoundItems.length > 0 ? (
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {myFoundItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Eye className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No Found Items</h3>
                    <p className="mt-2 text-sm text-muted-foreground">You haven't submitted any found items yet.</p>
                    <Link href="/report/found" className="mt-4">
                      <Button>Submit a Found Item</Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="claimed" className="mt-6">
                <h3 className="text-lg font-medium">Items You've Claimed or Returned</h3>
                {myClaimedItems.length > 0 ? (
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {myClaimedItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Eye className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No Claimed Items</h3>
                    <p className="mt-2 text-sm text-muted-foreground">You haven't claimed or returned any items yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

