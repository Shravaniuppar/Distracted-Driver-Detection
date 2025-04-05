"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecyclerDirectory from "@/components/member/recycler-directory"
import ShoppingCart from "@/components/member/shopping-cart"
import ProductCatalog from "@/components/member/product-catalog"
import Chatbot from "@/components/chatbot"
import { useLogout } from "@/lib/auth"

export default function MemberDashboard() {
  const logout = useLogout()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">EcoRecycle | Member Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>John Doe</span>
              <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recyclers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recyclers">Recyclers Directory</TabsTrigger>
            <TabsTrigger value="products">Shop Recycled Products</TabsTrigger>
            <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
          </TabsList>

          <TabsContent value="recyclers">
            <RecyclerDirectory />
          </TabsContent>

          <TabsContent value="products">
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="cart">
            <ShoppingCart />
          </TabsContent>
        </Tabs>
      </main>

      <Chatbot />
    </div>
  )
}

