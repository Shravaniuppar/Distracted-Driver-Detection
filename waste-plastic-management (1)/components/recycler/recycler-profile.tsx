"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function RecyclerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    companyName: "Green Recycling Co.",
    address: "123 Eco Street, Green City, GC 12345",
    phone: "(555) 123-4567",
    website: "https://greenrecycling.com",
    description: "Specializing in PET and HDPE recycling with state-of-the-art facilities.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your company profile has been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Manage your company information and contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          {isEditing ? (
            <Input id="companyName" name="companyName" value={profile.companyName} onChange={handleChange} />
          ) : (
            <p className="text-lg">{profile.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          {isEditing ? (
            <Input id="address" name="address" value={profile.address} onChange={handleChange} />
          ) : (
            <p>{profile.address}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          {isEditing ? (
            <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          {isEditing ? (
            <Input id="website" name="website" value={profile.website} onChange={handleChange} />
          ) : (
            <p>{profile.website}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          {isEditing ? (
            <Textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              rows={4}
            />
          ) : (
            <p>{profile.description}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
            Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

