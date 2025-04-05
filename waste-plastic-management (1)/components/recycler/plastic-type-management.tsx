"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { plasticTypes } from "@/lib/data"

export default function PlasticTypeManagement() {
  const [acceptedTypes, setAcceptedTypes] = useState<string[]>(["1", "2", "4"])

  const handleToggleType = (typeId: string) => {
    setAcceptedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      } else {
        return [...prev, typeId]
      }
    })

    const plasticType = plasticTypes.find((type) => type.id === typeId)
    if (plasticType) {
      toast({
        title: acceptedTypes.includes(typeId) ? "Plastic type removed" : "Plastic type added",
        description: acceptedTypes.includes(typeId)
          ? `You are no longer accepting ${plasticType.code} (${plasticType.name})`
          : `You are now accepting ${plasticType.code} (${plasticType.name})`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accepted Plastic Types</CardTitle>
        <CardDescription>Manage which types of plastic your facility accepts for recycling</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Accept</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Recyclable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plasticTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell>
                  <Checkbox
                    checked={acceptedTypes.includes(type.id)}
                    onCheckedChange={() => handleToggleType(type.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{type.code}</TableCell>
                <TableCell>{type.name}</TableCell>
                <TableCell>{type.description}</TableCell>
                <TableCell>{type.recyclable ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

