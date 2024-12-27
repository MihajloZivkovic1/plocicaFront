'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

export default function ActivationForm({ qrCode }: { qrCode: string }) {
  const [formData, setFormData] = useState({
    activationCode: '',
    profileName: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);


  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const dataToSubmit = {
      ...formData,
      qrCode,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/activate/${qrCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setSuccessMessage('Profile activated successfully! Redirecting...');
        setIsRedirecting(true);

        const profileResponse = await fetch(`http://localhost:3000/profiles/${qrCode}`);
        const profile = await profileResponse.json();

        const id = profile.profile?.id;

        const loginResponse = await fetch('/api/auth/login', {
          method: "POST",
          body: JSON.stringify({ email: formData.email, password: formData.password }),
          headers: {
            'Content-Type': 'application/json',
          }
        });


        if (loginResponse.ok) {
          router.push(`/edit-profile/${id}?tab=general`);
        }
        else {
          throw new Error('Failed to log in after activation');
        }


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
    finally {
      if (!isRedirecting)
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Dobro Došli to MemoryPlate</CardTitle>
          <CardDescription className="text-center">
            Aktivirajte svoju pločicu kako biste poceli da cuvate uspomene!
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
                disabled={isLoading || isRedirecting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activationCode">Aktivacioni Kod</Label>
              <Input
                type="text"
                id="activationCode"
                name="activationCode"
                value={formData.activationCode}
                onChange={handleChange}
                required
                disabled={isLoading || isRedirecting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileName">Ime pokojnika</Label>
              <Input
                type="text"
                id="profileName"
                name="profileName"
                value={formData.profileName}
                onChange={handleChange}
                required
                formNoValidate
                disabled={isLoading || isRedirecting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Vaš Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading || isRedirecting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Vaša Lozinka</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading || isRedirecting}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isRedirecting}>
              {isLoading || isRedirecting ? (
                <>
                  <Spinner className='mr-2' />
                  {isRedirecting ? 'Aktiviranje...' : 'Aktivacija u toku...'}
                </>
              ) : (
                'Aktivirajte Pločicu'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

