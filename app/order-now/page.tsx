'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ShoppingCart } from "@/components/ui/shopping-cart"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'

interface Country {
  code: string;
  name: string;
}

interface FormData {
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
}

export default function OrderNow() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const { toast } = useToast()

  const countries: Country[] = [
    { code: 'RS', name: 'Serbia' },
    { code: 'BA', name: 'Bosnia' },
    { code: 'AT', name: 'Austria' },
    { code: 'DE', name: 'Germany' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id.replace('billing-', '')]: value }))
    setErrors(prev => ({ ...prev, [id.replace('billing-', '')]: '' }))
  }

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }))
    setErrors(prev => ({ ...prev, country: '' }))
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof FormData] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!",
      })

      setTimeout(() => {
        router.push('/order-confirmation')
      }, 2000)
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-container max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-md">
      <ShoppingCart />
      <fieldset id="country-fields" className="mb-6">
        <legend className="sr-only">Select Country</legend>
        <h2 className="text-lg font-semibold mb-2">Izaberite državu</h2>
        <p className="text-sm text-gray-500 mb-4">
          Unesite vašu državu za isporuku.
        </p>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Država
          </label>
          <Select
            onValueChange={handleCountryChange}
            value={formData.country}
          >
            <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country: Country) => (
                <SelectItem key={country.code} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>
      </fieldset>
      <fieldset id="contact-fields" className="mb-6">
        <legend className="sr-only">Kontakt informacije</legend>
        <h2 className="text-lg font-semibold mb-2">Kontakt informacije</h2>
        <p className="text-sm text-gray-500 mb-4">
          Vašu email adresu ćemo koristiti da vam pošaljem email o potvrdi kupovine.
        </p>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </fieldset>
      <fieldset id="billing-fields" className="mb-6">
        <legend className="sr-only">Adresa za isporuku</legend>
        <h2 className="text-lg font-semibold mb-2">Adresa za isporuku</h2>
        <p className="text-sm text-gray-500 mb-4">Unesite adresu za isporuku</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="billing-firstName" className="block text-sm font-medium text-gray-700">Vaše ime</label>
            <Input
              id="billing-firstName"
              type="text"
              required
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="billing-lastName" className="block text-sm font-medium text-gray-700">Vaše prezime</label>
            <Input
              id="billing-lastName"
              type="text"
              required
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700">Adresa</label>
            <Input
              id="billing-address"
              type="text"
              required
              autoComplete="address-line1"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="billing-city" className="block text-sm font-medium text-gray-700">Grad</label>
            <Input
              id="billing-city"
              type="text"
              required
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="billing-postcode" className="block text-sm font-medium text-gray-700">Poštanski broj</label>
            <Input
              id="billing-postcode"
              type="text"
              required
              autoComplete="postal-code"
              value={formData.postcode}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset id="shipping-option" className="mb-6">
        <legend className="sr-only">Opcije isporuke</legend>
        <h2 className="text-lg font-semibold mb-2">Opcije isporuke</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              name="shipping-option"
              value="free_shipping"
              defaultChecked
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">Besplatna dostava</span>
          </label>
        </div>
      </fieldset>

      <fieldset id="payment-method" className="mb-6">
        <legend className="sr-only">Opcije plaćanja</legend>
        <h2 className="text-lg font-semibold mb-2">Opcije plaćanja</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              name="payment-method"
              value="cod"
              defaultChecked
              className="h-4 w-4 text-black-600 border-gray-300 focus:ring-black-500"
            />
            <span className="text-sm font-medium text-gray-700">Plaćanje pouzećem</span>
          </label>
        </div>
      </fieldset>

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Nastavkom kupovine vi se slažete sa našim <Link href="#" className="text-black-600 underline">Uslovima kupovine</Link> <span> i </span>
          <Link href="#" className="text-black-600 underline">Politikom privatnosti</Link>.
        </p>
      </div>

      <div className="flex flex-row sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-sm text-black-600 hover:underline flex items-center space-x-2">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z" />
          </svg>
          <span>Povratak</span>
        </Link>
        <Button type="submit">Naručite</Button>
      </div>
    </form>
  )
}

