"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash } from "lucide-react"
import { plasticTypes } from "@/lib/data"
import type { PlasticType } from "@/lib/types"

export default function PlasticTypeManagement() {
  const [types, setTypes] = useState<PlasticType[]>(plasticTypes)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newType, setNewType] = useState({
    name: "",
    code: "",
    description: "",
    recyclable: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewType((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewType((prev) => ({
      ...prev,
      recyclable: checked,
    }))
  }

  const handleAddType = () => {
    // Validate form
    if (!newType.name || !newType.code || !newType.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new plastic type
    const plasticType: PlasticType = {
      id: `${types.length + 1}`,
      name: newType.name,
      code: newType.code.toUpperCase(),
      description: newType.description,
      recyclable: newType.recyclable,
    }

    // Add to list
    setTypes((prev) => [...prev, plasticType])

    // Reset form and close dialog
    setNewType({
      name: "",
      code: "",
      description: "",
      recyclable: true,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Plastic type added",
      description: "The new plastic type has been added successfully.",
    })
  }

  const handleDeleteType = (id: string) => {
    setTypes((prev) => prev.filter((type) => type.id !== id))
    toast({
      title: "Plastic type deleted",
      description: "The plastic type has been removed from the system.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Plastic Types</CardTitle>
          <CardDescription>Manage the types of plastic that can be recycled in the system</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Add Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Plastic Type</DialogTitle>
              <DialogDescription>Create a new plastic type for recyclers to accept</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newType.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. Polyethylene Terephthalate"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  name="code"
                  value={newType.code}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. PET"
                  maxLength={5}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newType.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. Used for soda bottles and food containers"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recyclable" className="text-right">
                  Recyclable
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch id="recyclable" checked={newType.recyclable} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="recyclable">{newType.recyclable ? "Yes" : "No"}</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddType} className="bg-green-600 hover:bg-green-700">
                Add Plastic Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Recyclable</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="font-bold">{type.code}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell className="max-w-[300px] truncate">{type.description}</TableCell>
                <TableCell>
                  {type.recyclable ? (
                    <Badge className="bg-green-500">Yes</Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-500 border-red-500">
                      No
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteType(type.id)}
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

