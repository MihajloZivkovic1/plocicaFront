'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you would typically send the form data to your server
    console.log({ name, email, message })
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-serif font-bold text-slate-800 mb-8 text-center">Kontaktirajte nas</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Pošaljite nam poruku</CardTitle>
            <CardDescription>Popunite formular ispod i odgovorićemo vam u najkraćem mogućem roku.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ime</Label>
                <Input
                  id="name"
                  placeholder="Vaše ime"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vasa@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Poruka</Label>
                <Textarea
                  id="message"
                  placeholder="Vaša poruka"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Pošalji poruku</Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kontakt informacije</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary" />
                <span>info@memoryplate.rs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary" />
                <span>+381 21 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-primary" />
                <span>Bulevar Oslobođenja 123, 21000 Novi Sad</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Naša lokacija</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-200 rounded-md overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Mapa lokacije MemoryPlate"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

