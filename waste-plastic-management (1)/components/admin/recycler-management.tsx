"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Check, X, Eye, Trash } from "lucide-react"
import { recyclers } from "@/lib/data"

export default function RecyclerManagement() {
  const [recyclerList, setRecyclerList] = useState(recyclers)

  const handleDeleteRecycler = (id: string) => {
    setRecyclerList((prev) => prev.filter((recycler) => recycler.id !== id))
    toast({
      title: "Recycler deleted",
      description: "The recycler has been removed from the system.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recycler Management</CardTitle>
        <CardDescription>Manage recycler accounts and verify their information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Plastic Types</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recyclerList.map((recycler) => (
              <TableRow key={recycler.id}>
                <TableCell className="font-medium">{recycler.companyName}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p>{recycler.phone}</p>
                    {recycler.website && (
                      <a
                        href={recycler.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        {recycler.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {recycler.acceptedPlasticTypes.map((type) => (
                      <Badge key={type.id} variant="outline" className="bg-green-50">
                        {type.code}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {Math.random() > 0.5 ? (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <X className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-amber-500">Pending</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteRecycler(recycler.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

