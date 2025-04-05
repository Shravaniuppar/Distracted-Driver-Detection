"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { products, plasticTypes, recyclers } from "@/lib/data"
import type { Product } from "@/lib/types"

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterRecycler, setFilterRecycler] = useState("")
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "" || product.plasticTypeId === filterType
    const matchesRecycler = filterRecycler === "" || product.recyclerId === filterRecycler

    return matchesSearch && matchesType && matchesRecycler
  })

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { id: product.id, quantity: 1 }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shop Recycled Products</CardTitle>
          <CardDescription>Browse and purchase eco-friendly products made from recycled plastics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Search products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by plastic type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All plastic types</SelectItem>
                  {plasticTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.code} - {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={filterRecycler} onValueChange={setFilterRecycler}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by recycler" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All recyclers</SelectItem>
                  {recyclers.map((recycler) => (
                    <SelectItem key={recycler.id} value={recycler.id}>
                      {recycler.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const plasticType = plasticTypes.find((type) => type.id === product.plasticTypeId)
                const recycler = recyclers.find((r) => r.id === product.recyclerId)

                return (
                  <Card key={product.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-square relative bg-gray-100">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg text-green-600">${product.price.toFixed(2)}</p>
                        <Badge variant="outline" className="bg-green-50">
                          {plasticType?.code || "Unknown"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                      <p className="text-xs text-gray-500 mt-2">By {recycler?.companyName || "Unknown Recycler"}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No products found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

