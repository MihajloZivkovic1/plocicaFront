
import React from 'react'
import StoryModal from '@/components/ui/modal';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

async function fetchProfileData(qrCode: string) {
  const res = await fetch(`http://localhost:3000/profiles/${qrCode}`);
  if (!res.ok) {
    throw new Error('Failed to fetch profile data');
  }

  return res.json();
}

export default async function ProfileData({ qrCode }: { qrCode: string }) {

  const profileData = await fetchProfileData(qrCode)
  const { profile } = profileData;
  const stories = profileData.profile.Stories || [];
  const events = profileData.profile.Events || [];


  const formattedDateofBirth = new Date(profile.dateOfBirth).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace("/", "/");

  const formattedDateofDeath = new Date(profile.dateOfDeath).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace("/", "/");

  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-screen-md">
        <section>
          <Image
            className="relative bg-cover bg-center"
            src={profile?.photo ?? 'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'}
            alt="profilePhoto"
            layout="responsive"
            width={16}
            height={9} // This maintains a 16:9 aspect ratio
            style={{
              objectFit: 'contain',
            }}
          />
          <div className="container  mx-auto px-4 pt-5">
            <div className="text-left">
              <h6 className="font-medium text-gray-900 text-3xl md:text-2xl uppercase mb-8">
                {profile?.profileName || 'No Profile Name'}
              </h6>

              <h1 className="font-normal text-gray-900 text-xl md:text-7xl leading-none mb-8">
                {`${formattedDateofBirth} - ${formattedDateofDeath}` ?? 'No Date Provided'}
              </h1>
              <h1 className='font-normal text-gray-900 text-4xl md:text-4xl pt-5'>Short biography</h1>
              <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
                {profile?.text || 'No bio available'}
              </p>
              <h1 className='font-normal text-gray-900 text-4xl md:text-4xl pt-5'>Religion</h1>
              <p className="font-normal text-gray-900 text-md md:text-4xl mb-16 p-5">
                {profile?.religion || 'No religion provided'}
              </p>

              <h1 className='font-normal text-gray-900 text-4xl md:text-4xl pt-5'>Biography</h1>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl"> {/* Adjust the max-width as needed */}
                  <ReactMarkdown
                    className="markdown-content text-gray-900 text-md md:text-lg mb-16"
                    rehypePlugins={[rehypeRaw]}
                  >
                    {profile?.bio}
                  </ReactMarkdown>
                </div>
              </div>
              <h1 className='font-normal text-gray-900 text-4xl md:text-4xl mb-6 text-left'>Events</h1>

              <div className="container max-w-screen-xl mx-auto p-4 text-left">
                <div className="grid grid-cols-1 gap-4">
                  {events.map((event: { title: string, location: string, dateOfEvent: string }, index: number) => {
                    // Convert dateOfEvent string to Date and format
                    const formattedDate = new Date(event.dateOfEvent).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    });
                    return (
                      <div>
                        {/* Event Card */}
                        <div className="bg-gray-500 text-white rounded-md flex flex-col items-start justify-center shadow-md p-4 w-full" key={index}>
                          <h2 className="text-xl font-bold">{event.title}</h2>
                          <p className="text-sm mt-1">{formattedDate}</p>
                          <p className="text-sm">{event.location}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className='text-left'>
                <h1 className='font-normal text-gray-900 text-4xl mb-4'>Gallery</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Image or Video Card */}
                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md w-full aspect-video">
                    <img src="/path-to-image.jpg" alt="Photo 1" className="w-full h-full object-cover" />
                    {/* Add a caption if needed */}
                    <div className="p-2">
                      <p className="text-center text-sm font-semibold">Photo Title</p>
                    </div>
                  </div>

                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md w-full aspect-video">
                    <video src="/path-to-video.mp4" controls className="w-full h-full object-cover" />
                    <div className="p-2">
                      <p className="text-center text-sm font-semibold">Video Title</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="grid grid-cols-1 gap-4">
                  {/* Ovde napraviti modal za price*/}
                  <div className="container max-w-screen-xl mx-auto p-4">
                    <h1 className='font-normal text-gray-900 text-4xl mb-6'>Stories</h1>
                    <div className="">
                      {stories.map((story: { title: string; text: string }, index: number) => (
                        <StoryModal key={index} story={story} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
      </div>
    </div >
  )
}
