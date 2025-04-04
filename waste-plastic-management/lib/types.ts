export type UserRole = "admin" | "recycler" | "member"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface Recycler {
  id: string
  userId: string
  companyName: string
  address: string
  phone: string
  website?: string
  description: string
  acceptedPlasticTypes: PlasticType[]
}

export interface Member {
  id: string
  userId: string
  address?: string
  phone?: string
}

export interface PlasticType {
  id: string
  name: string
  code: string // e.g., "PET", "HDPE", etc.
  description: string
  recyclable: boolean
}

export interface Product {
  id: string
  recyclerId: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
  plasticTypeId: string
  createdAt: Date
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  memberId: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: Date
}

