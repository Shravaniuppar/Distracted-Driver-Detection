import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagement from "@/components/admin/user-management"
import RecyclerManagement from "@/components/admin/recycler-management"
import PlasticTypeManagement from "@/components/admin/plastic-type-management"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">EcoRecycle | Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>Admin User</span>
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
                <CardTitle>System Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registered Recyclers</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Products Listed</p>
                  <p className="text-2xl font-bold">342</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders This Month</p>
                  <p className="text-2xl font-bold">87</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="recyclers">Recycler Management</TabsTrigger>
                <TabsTrigger value="plastic-types">Plastic Types</TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              <TabsContent value="recyclers">
                <RecyclerManagement />
              </TabsContent>

              <TabsContent value="plastic-types">
                <PlasticTypeManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

