import React from 'react'

async function fetchProfileData(qrCode: string) {
  const res = await fetch(`http://localhost:3000/profiles/${qrCode}`);
  if (!res.ok) {
    throw new Error('Failed to fetch profile data');
  }
  console.log(res);
  return res.json();
}


export default async function ProfileData({ qrCode }: { qrCode: string }) {
  console.log("Ovo je qr kod", qrCode)
  const profileData = await fetchProfileData(qrCode)


  const { profile } = profileData;

  console.log("Ovo je profil", profile);

  return (
    <div>
      <section className="py-10 md:py-16">

        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">{profile?.profileName ? profile.profileName : null}</h6>

            <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">{profile?.dateOfDeath ? profile.dateOfDeath : null}</h1>

            <p className="font-normal text-gray-600 text-md md:text-xl mb-16">{profile?.bio ? profile.bio : null}</p>

            <a href="#" className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500">Hire me</a>
          </div>

        </div>

      </section>
    </div>
  )
}
