'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AddProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  userId: string
}

export function AddProfileModal({ isOpen, onClose, userEmail, userId }: AddProfileModalProps) {
  const [activationCode, setActivationCode] = useState('')
  const [profileName, setProfileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3000/users/activateIfUserExists/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activationCode: activationCode,
          profileName: profileName,
          email: userEmail
        })
      })

      const newProfile = await response.json()

      if (response.ok) {
        const profileId = newProfile.profile.id
        onClose()
        router.push(`/edit-profile/${profileId}?tab=general`)
      } else {
        // Handle error case
        console.error('Failed to activate new profile', newProfile)
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Failed to activate new profile', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj Novi Profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="activationCode">Aktivacioni Kod</Label>
            <Input
              id="activationCode"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="Unesite aktivacioni kod sa kutije"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="profileName">Ime Pokojnika</Label>
            <Input
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Unesite ime pokojnika"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={userEmail}
              readOnly
              disabled
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Učitavanje...
              </>
            ) : (
              'Dodaj Profil'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

