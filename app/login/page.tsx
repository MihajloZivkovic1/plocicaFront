"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../../lib"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)

    try {
      await login({
        email: formData.email,
        password: formData.password
      })

      toast({
        title: "Uspešno",
        description: "Uspešno ste se prijavili na vaš profil",
        variant: "default",
      })
      router.push("/")
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "NotFound") {
          setLoginError("Korisnik sa ovom email adresom ne postoji")
        } else if (err.message === "CredentialsError") {
          setLoginError("Pogrešna lozinka, molimo pokušajte ponovo")
        } else {
          setLoginError("Došlo je do neočekivane greške. Molimo pokušajte ponovo.")
        }
      } else {
        console.error("Unexpected error:", err)
        setLoginError("Došlo je do neočekivane greške. Molimo pokušajte ponovo.")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">MemoryPlate</CardTitle>
          <CardDescription className="text-center">Unesite vaše podatke za prijavu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loginError && (
            <Alert variant="destructive">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email adresa</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ime@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lozinka</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">Prijavi se</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nemate nalog?{" "}
            <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
              Registrujte se
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

