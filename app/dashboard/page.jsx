import React from 'react'
import { getSession } from '../../lib'
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default async function Dashboard() {
  const session = await getSession();
  const userId = session?.user?.user?.id;

  if (!userId) {
    return <div>User not logged in.</div>;
  }

  const res = await fetch(`http://localhost:3000/users/getUsersProfiles/${userId}`);
  const profiles = await res.json();
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4 pt-12 w-full">
      {profiles.length > 0 ? (
        <ul className='w-full'>
          {profiles.map(profile => {
            const formattedDate = new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).replace("/", "/");

            return (
              <li key={profile.id} className="flex flex-col items-center justify-center  space-y-6 p-4 pt-12 w-full">
                <div className="max-w-sm rounded overflow-hidden shadow-lg w-full">
                  <img
                    src={profile.photo || 'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'}
                    className="w-48 h-48 object-cover"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{profile.profileName}</div>
                    <p className="text-gray-700 text-base">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <Link href={`/edit-profile/${profile.id}?tab=general`}>
                      <Button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-full">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/profiles/${profile.qrCode}`}>
                      <Button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-full">
                        View Profile
                      </Button>
                    </Link>

                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No profiles found for this user.</div>
      )}
    </div>
  );
}