'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getSession } from '../../lib'


interface User {
  token: string;

}

interface Session {
  user: User;
}

export default function UserSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [language, setLanguage] = useState('sr')
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  const { toast } = useToast();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getSession()
        setSession(userSession as Session)
      } catch (error) {
        console.error("Failed to fetch session:", error)
      }
    }

    fetchSession()
  }, [])

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Greška",
        description: "Nove lozinke se ne podudaraju.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:3000/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Uspeh",
          description: data.message,
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        toast({
          title: "Greška",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom promene lozinke.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    console.log('Language changed to', value)
    toast({
      title: "Uspeh",
      description: "Jezik je uspešno promenjen.",
    })
  }

  return (
    <div className="container mx-auto py-10 mt-12 p-4">
      <h1 className="text-3xl font-bold mb-6">Podešavanja korisnika</h1>
      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">Promena lozinke</TabsTrigger>
          <TabsTrigger value="language">Jezik</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Promena lozinke</CardTitle>
              <CardDescription>Ažurirajte svoju lozinku ovde. Nakon promene, bićete odjavljeni.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="currentPassword">Trenutna lozinka</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="newPassword">Nova lozinka</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Potvrdite novu lozinku</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="px-0 pt-6">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Menjanje lozinke...' : 'Promeni lozinku'}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>Izbor jezika</CardTitle>
              <CardDescription>Izaberite željeni jezik za korišćenje aplikacije.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">Jezik</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Izaberite jezik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sr">Srpski</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="sk">Slovenčina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}