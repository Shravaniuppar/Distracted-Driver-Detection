"use client"

import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    // In a real app, this would clear authentication tokens, cookies, etc.
    // For now, we'll just simulate the logout process

    // Show loading toast
    toast({
      title: "Logging out...",
      description: "Please wait while we log you out.",
    })

    // Simulate API call delay
    setTimeout(() => {
      // Redirect to login page
      router.push("/login")

      // Show success toast after redirect
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
    }, 1000)
  }

  return logout
}

