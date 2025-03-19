"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, Package, User, Settings, Bell, LogOut, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      color: "text-sky-500",
    },
    {
      label: "Search",
      icon: Search,
      href: "/search",
      color: "text-violet-500",
    },
    {
      label: "Report Lost",
      icon: PlusCircle,
      href: "/report/lost",
      color: "text-pink-700",
    },
    {
      label: "Report Found",
      icon: Package,
      href: "/report/found",
      color: "text-orange-700",
    },
    {
      label: "My Profile",
      icon: User,
      href: "/profile",
      color: "text-emerald-500",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/profile/notifications",
      color: "text-yellow-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/profile/settings",
      color: "text-gray-500",
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-lg font-semibold">Lost & Found</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                      pathname === route.href ? "bg-muted font-medium" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className={cn("h-5 w-5", route.color)} />
                    {route.label}
                    {pathname === route.href && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r bg-muted/10 md:block", className)}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <h2 className="font-semibold">Lost & Found</h2>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                    pathname === route.href ? "bg-muted font-medium" : "text-muted-foreground",
                  )}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  <span>{route.label}</span>
                  {pathname === route.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

