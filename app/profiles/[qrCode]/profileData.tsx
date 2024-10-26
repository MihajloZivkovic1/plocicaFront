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

  return (
    <div>
      <section className="py-10 md:py-16">
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: `url(${profile?.photo || 'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'})`,
            backgroundSize: 'contain', // Ensures the image fits within the div
            backgroundRepeat: 'no-repeat', // Avoids image tiling
            aspectRatio: '16/9' // Maintains a responsive aspect ratio (you can adjust as needed)
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
              {profile?.profileName || 'No Profile Name'}
            </h6>

            <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">
              {profile?.dateOfDeath || 'No Date Provided'}
            </h1>

            <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
              {profile?.bio || 'No bio available'}
            </p>

            <a
              href="#"
              className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500"
            >
              Hire me
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
