import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecyclerProfile from "@/components/recycler/recycler-profile"
import ProductManagement from "@/components/recycler/product-management"
import PlasticTypeManagement from "@/components/recycler/plastic-type-management"
import Chatbot from "@/components/chatbot"

export default function RecyclerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">EcoRecycle | Recycler Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>Green Recycling Co.</span>
              <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Products Listed</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders This Month</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plastic Types Accepted</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Company Profile</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="plastic-types">Plastic Types</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <RecyclerProfile />
              </TabsContent>

              <TabsContent value="products">
                <ProductManagement />
              </TabsContent>

              <TabsContent value="plastic-types">
                <PlasticTypeManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}

