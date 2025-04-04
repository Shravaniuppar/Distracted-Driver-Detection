"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Trash, MinusCircle, PlusCircle, CreditCard } from "lucide-react"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

type CartItem = {
  product: Product
  quantity: number
}

export default function ShoppingCart() {
  // In a real app, this would be stored in a global state or context
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 2 },
  ])

  const [subtotal, setSubtotal] = useState(0)
  const shippingCost = 5.99
  const taxRate = 0.07 // 7% tax

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    setSubtotal(newSubtotal)
  }, [cartItems])

  const handleQuantityChange = (productId: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Redirecting to payment gateway...",
    })
    // In a real app, this would redirect to a payment gateway
    setTimeout(() => {
      setCartItems([])
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    }, 2000)
  }

  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Shopping Cart</CardTitle>
          <CardDescription>Review your items and proceed to checkout</CardDescription>
        </CardHeader>
        <CardContent>
          {cartItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.product.imageUrl || "/placeholder.svg"}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.product.id, -1)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.product.id, 1)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty.</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700">Continue Shopping</Button>
            </div>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="flex flex-col">
            <div className="w-full md:w-[400px] ml-auto space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                <CreditCard className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

