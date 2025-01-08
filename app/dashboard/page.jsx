"use client"

import React, { useState } from 'react'
import { getSession } from '../../lib'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, PencilIcon, EyeIcon, PlusIcon } from 'lucide-react'
import { AddProfileModal } from '@/components/addProfileModal'

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [profiles, setProfiles] = useState([])

  React.useEffect(() => {
    async function fetchData() {
      const sessionData = await getSession()
      setSession(sessionData)

      if (sessionData?.user?.user?.id) {
        const res = await fetch(`http://localhost:3000/users/getUsersProfiles/${sessionData.user.user.id}`)
        const profilesData = await res.json()
        setProfiles(profilesData)
      }
    }

    fetchData()
  }, [])

  const userId = session?.user?.user?.id

  console.log(userId);

  // if (!userId) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Card>
  //         <CardContent className="pt-6">
  //           <p className="text-center text-gray-600">Korisnik nije ulogovan</p>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vaše Pločice</h1>
        <Button onClick={() => setIsModalOpen(true)} className='mt-1'>
          <PlusIcon className="w-4 h-4 mr-2" />
          Dodaj Novi Profil
        </Button>
      </div>
      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {profiles.map(profile => {
            const formattedDate = new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).replace(/\//g, "/")

            return (
              <Card key={profile.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl font-semibold">{profile.profileName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.photo || 'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'} alt='avatar-photo' />
                      <AvatarFallback>{profile.profileName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-600 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Link href={`/preview-profile/${profile.qrCode}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Pogledajte Profil
                    </Button>
                  </Link>
                  <Link href={`/edit-profile/${profile.id}?tab=general`} className="w-full">
                    <Button variant="default" className="w-full">
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Uredite Profil
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Korisnik nema ni jedan profil</p>
          </CardContent>
        </Card>
      )}
      <AddProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={session?.user?.user?.email}
        userId={userId}
      />
    </div>
  )
}

