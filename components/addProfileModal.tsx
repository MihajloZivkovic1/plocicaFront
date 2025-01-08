"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"


interface AddProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  userId: string
}

export function AddProfileModal({ isOpen, onClose, userEmail, userId }: AddProfileModalProps) {
  const router = useRouter()
  const [activationCode, setActivationCode] = useState('')
  const [profileName, setProfileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

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

      const data = await response.json()
      console.log(data);
      if (response.ok) {
        const profileId = data.profile.id
        onClose()
        router.push(`/edit-profile/${profileId}?tab=general`)
      } else {
        if (data.error === "NotFound") {
          setErrorMessage("Activation failed: Activation Code does not exist. Please check the code and try again.")
        } else if (data.error === "AlreadyActivatedProfile") {
          setErrorMessage("Activation failed: This product is already activated.")
        } else if (data.error === "MissingParamsError") {
          setErrorMessage("Missing parameters: Please fill in all required fields and try again.")
        } else {
          setErrorMessage("An error occurred while activating the profile. Please try again.")
        }
      }
    } catch (error) {
      console.error('Failed to activate new profile', error)
      setErrorMessage("An unexpected error occurred. Please try again later.")
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
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={userEmail}
              readOnly
              disabled
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Učitavanje...
                </>
              ) : (
                'Dodaj Profil'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

