import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, ShoppingBag, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">EcoRecycle</h1>
          <Link href="/login">
            <Button variant="outline" className="text-white border-white hover:bg-green-700">
              Login
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-green-500 to-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transforming Plastic Waste Into Value</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our platform to connect with recyclers, manage plastic waste efficiently, and shop for recycled
              products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-700">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Recyclers</h3>
                <p className="text-gray-600">
                  Register your facility, specify the types of plastic you accept, and list your recycled products for
                  sale.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">For Members</h3>
                <p className="text-gray-600">
                  Find nearby recyclers, learn about acceptable plastic types, and contribute to sustainable waste
                  management.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Shop Recycled</h3>
                <p className="text-gray-600">
                  Browse and purchase eco-friendly products made from recycled plastics directly from recyclers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; 2025 EcoRecycle. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

