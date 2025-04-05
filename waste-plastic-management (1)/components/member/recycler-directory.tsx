"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe } from "lucide-react"
import { recyclers, plasticTypes } from "@/lib/data"

export default function RecyclerDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")

  const filteredRecyclers = recyclers.filter((recycler) => {
    const matchesSearch =
      recycler.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recycler.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "" || recycler.acceptedPlasticTypes.some((type) => type.id === filterType)

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Recyclers</CardTitle>
          <CardDescription>Locate recyclers in your area and see what types of plastic they accept</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {filteredRecyclers.length > 0 ? (
              filteredRecyclers.map((recycler) => (
                <Card key={recycler.id} className="overflow-hidden">
                  <CardHeader className="bg-green-50">
                    <CardTitle>{recycler.companyName}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                        <span>{recycler.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{recycler.phone}</span>
                      </div>
                      {recycler.website && (
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-gray-500" />
                          <a
                            href={recycler.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            {recycler.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium mb-2">Accepted plastic types:</p>
                        <div className="flex flex-wrap gap-2">
                          {recycler.acceptedPlasticTypes.map((type) => (
                            <Badge key={type.id} variant="outline" className="bg-green-50">
                              {type.code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                      Contact Recycler
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No recyclers found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

