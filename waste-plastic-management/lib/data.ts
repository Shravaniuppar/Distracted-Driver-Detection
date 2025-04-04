import type { PlasticType, Product, Recycler, User } from "./types"

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@ecorecycle.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Green Recycling Co.",
    email: "contact@greenrecycling.com",
    role: "recycler",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "EcoPlast Solutions",
    email: "info@ecoplast.com",
    role: "recycler",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "5",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member",
    createdAt: new Date("2024-03-01"),
  },
]

// Mock plastic types
export const plasticTypes: PlasticType[] = [
  {
    id: "1",
    name: "Polyethylene Terephthalate",
    code: "PET",
    description: "Commonly used for soda bottles, water bottles, and food containers.",
    recyclable: true,
  },
  {
    id: "2",
    name: "High-Density Polyethylene",
    code: "HDPE",
    description: "Used for milk jugs, detergent bottles, and toys.",
    recyclable: true,
  },
  {
    id: "3",
    name: "Polyvinyl Chloride",
    code: "PVC",
    description: "Used for pipes, shower curtains, and medical tubing.",
    recyclable: false,
  },
  {
    id: "4",
    name: "Low-Density Polyethylene",
    code: "LDPE",
    description: "Used for plastic bags, six-pack rings, and tubing.",
    recyclable: true,
  },
  {
    id: "5",
    name: "Polypropylene",
    code: "PP",
    description: "Used for yogurt containers, medicine bottles, and bottle caps.",
    recyclable: true,
  },
  {
    id: "6",
    name: "Polystyrene",
    code: "PS",
    description: "Used for foam cups, take-out containers, and packing peanuts.",
    recyclable: false,
  },
  {
    id: "7",
    name: "Other",
    code: "OTHER",
    description: "Includes polycarbonate, acrylic, and mixed plastics.",
    recyclable: false,
  },
]

// Mock recyclers data
export const recyclers: Recycler[] = [
  {
    id: "1",
    userId: "2",
    companyName: "Green Recycling Co.",
    address: "123 Eco Street, Green City, GC 12345",
    phone: "(555) 123-4567",
    website: "https://greenrecycling.com",
    description: "Specializing in PET and HDPE recycling with state-of-the-art facilities.",
    acceptedPlasticTypes: [plasticTypes[0], plasticTypes[1], plasticTypes[3]],
  },
  {
    id: "2",
    userId: "3",
    companyName: "EcoPlast Solutions",
    address: "456 Sustainability Ave, Eco Town, ET 67890",
    phone: "(555) 987-6543",
    website: "https://ecoplast.com",
    description:
      "Full-service recycling center accepting all types of plastics and creating innovative recycled products.",
    acceptedPlasticTypes: [plasticTypes[0], plasticTypes[1], plasticTypes[3], plasticTypes[4]],
  },
]

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    recyclerId: "1",
    name: "Recycled Plastic Planter",
    description: "Eco-friendly planter made from 100% recycled PET plastic.",
    price: 24.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 50,
    plasticTypeId: "1",
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "2",
    recyclerId: "1",
    name: "Recycled Outdoor Bench",
    description: "Durable outdoor bench made from recycled HDPE plastic. Weather-resistant and maintenance-free.",
    price: 199.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 10,
    plasticTypeId: "2",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "3",
    recyclerId: "2",
    name: "Eco-Friendly Cutting Board",
    description: "Kitchen cutting board made from recycled HDPE plastic. Dishwasher safe and BPA-free.",
    price: 34.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 25,
    plasticTypeId: "2",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    recyclerId: "2",
    name: "Recycled Plastic Decking",
    description: "Premium decking material made from recycled plastic. Sold per square foot.",
    price: 8.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 1000,
    plasticTypeId: "4",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "5",
    recyclerId: "1",
    name: "Eco Storage Containers (Set of 3)",
    description: "Food-safe storage containers made from recycled PP plastic.",
    price: 19.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    stock: 30,
    plasticTypeId: "5",
    createdAt: new Date("2024-03-20"),
  },
]

// Helper functions to simulate database operations
export function getRecyclerById(id: string): Recycler | undefined {
  return recyclers.find((recycler) => recycler.id === id)
}

export function getProductsByRecyclerId(recyclerId: string): Product[] {
  return products.filter((product) => product.recyclerId === recyclerId)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getAcceptedPlasticTypes(recyclerId: string): PlasticType[] {
  const recycler = getRecyclerById(recyclerId)
  return recycler ? recycler.acceptedPlasticTypes : []
}

