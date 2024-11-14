'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // for redirection
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';


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
      const response = await fetch(`http://localhost:3000/users/activate/${qrCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        setSuccessMessage('Profile activated successfully! Redirecting...'); //modal napraviti
        setErrorMessage('');

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

        if (!loginResponse.ok) {
          throw new Error('Failed to log in after activation');
        }


        setTimeout(async () => {

          router.push(`/edit-profile/${id}?tab=general`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Activation failed: ${errorData.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Failed to activate profile', error);
      setErrorMessage('An error occurred while activating the profile.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='flex flex-col items-center h-screen'>
      <br></br>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} className='w-full max-w-lg p-4' >
        <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2">
          <div>
            <label htmlFor="activationCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activation Code</label>
            <Input
              type="text"
              id="activationCode"
              name="activationCode"
              value={formData.activationCode}
              onChange={handleChange}
              required
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="profileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime Pokojnika</label>
            <Input
              type="text"
              id="profileName"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              required
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div> */}
        </div>
        {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Activate Profile
        </button> */}
        <Button>Activate Profile</Button>
      </form>
    </div>
  );
}



