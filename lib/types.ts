export interface Item {
  id: string
  name: string
  description: string
  type: "lost" | "found"
  category: string
  location: string
  date: string
  status: "pending" | "claimed" | "unclaimed"
  image?: string
  color?: string
  brand?: string
  contactName?: string
  contactInfo?: string
}

