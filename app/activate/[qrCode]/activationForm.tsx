'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ActivationForm({ qrCode }: { qrCode: string }) {
  const [formData, setFormData] = useState({
    activationCode: '',
    profileName: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      qrCode,
    };

    try {
      const response = await fetch(`https://plocicaapi.onrender.com/users/activate/${qrCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setSuccessMessage('Profile activated successfully! Redirecting...');
        setErrorMessage('');

        const profileResponse = await fetch(`https://plocicaapi.onrender.com/profiles/${qrCode}`);
        const profile = await profileResponse.json();

        const id = profile.profile?.id;

        const loginResponse = await fetch('/api/auth/login', {
          method: "POST",
          body: JSON.stringify({ email: formData.email, password: formData.password }),
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!loginResponse.ok) {
          throw new Error('Failed to log in after activation');
        }
        setTimeout(() => {
          router.push(`/edit-profile/${id}?tab=general`);
        }, 500);

      } else {
        const errorData = await response.json();
        if (errorData.error === "NotFound") {
          setErrorMessage(`Activation failed: Activation Code does not exist, make sure you entered the rigth activaton code from package`);
        }
        else if (errorData.error === "UserWithMailAreadyExists") {
          setErrorMessage(`Activation failed: User with that email already exists. If you already have a plate and want to register another one, please check our site.`);
        }
        else if (errorData.error === "AlreadyActivatedProfile") {
          setErrorMessage(`Activation failed: Product is already activated`);
        }
        else if (errorData.error === "MissingParamsError") {
          setErrorMessage("Missing params: Please try again");
        }
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Failed to activate profile', error);
      setErrorMessage(`An error occurred while activating the profile.`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome to MemoryPlate</CardTitle>
          <CardDescription className="text-center">
            Activate your product to start preserving memories
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activationCode">QR Code</Label>
              <Input
                type="text"
                id="qrCode"
                name="qrCode"
                defaultValue={qrCode}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activationCode">Activation Code</Label>
              <Input
                type="text"
                id="activationCode"
                name="activationCode"
                value={formData.activationCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileName">Name of the Deceased</Label>
              <Input
                type="text"
                id="profileName"
                name="profileName"
                value={formData.profileName}
                onChange={handleChange}
                required
                formNoValidate
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Activate Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

