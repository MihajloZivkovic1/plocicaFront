
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import StoryModal from '@/components/ui/modal'
import { User, Book, Church, Calendar, Image as ImageIcon, BookOpen, Film } from 'lucide-react'
import { fetchMedia } from '@/app/lib/fetchMedia'


async function fetchProfileData(qrCode: string) {
  const res = await fetch(`http://localhost:3000/profiles/${qrCode}`)
  if (!res.ok) {
    throw new Error('Failed to fetch profile data')
  }
  return res.json()
}

export default async function ProfileData({ qrCode }: { qrCode: string }) {

  const profileData = await fetchProfileData(qrCode)
  const { profile } = profileData
  const stories = profile.Stories || []
  const events = profile.Events || []

  const media = await fetchMedia(profile.id);
  const mediaArray = media.media
  console.log(mediaArray);
  const images = mediaArray.filter((item: any) => item.mediaType === 'photo');
  const videos = mediaArray.filter((item: any) => item.mediaType === 'video');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "/")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative mb-4">
        <Image
          src={profile?.photo ?? '/placeholder.svg?height=384&width=384'}
          alt={profile?.profileName || 'Profile photo'}
          width={1000}
          height={562}
          layout="responsive"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">{profile?.profileName || 'No Profile Name'}</h1>
            <p className="text-lg sm:text-xl">{`${formatDate(profile.dateOfBirth)} - ${formatDate(profile.dateOfDeath)}`}</p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <User className="mr-2" size={24} />
                Short Biography
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">{profile?.text || 'No bio available'}</p>
            </section>

            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <Church className="mr-2" size={24} />
                Religion
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">{profile?.religion || 'No religion provided'}</p>
            </section>

            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <Book className="mr-2" size={24} />
                Biography
              </h2>
              <div className="prose max-w-none text-sm sm:text-base">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {profile?.bio || 'No detailed biography available'}
                </ReactMarkdown>
              </div>
            </section>

            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <Calendar className="mr-2" size={24} />
                Events
              </h2>
              <div className="space-y-4">
                {events.map((event: { title: string, location: string, dateOfEvent: string }, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold">{event.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{formatDate(event.dateOfEvent)}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{event.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <ImageIcon className="mr-2" size={24} />
                Gallery
              </h2>
              {images.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Images</h3>
                  <ScrollArea className="h-48 sm:h-72">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                      {images.map((image: any, index: number) => (
                        <div key={image.id}
                          className="aspect-square relative"
                        >
                          <Image
                            src={image.url}
                            alt={`Gallery image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
              {videos.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mb-2 mt-4 flex items-center">
                    <Film className="mr-2" size={20} />
                    Videos
                  </h3>
                  <ScrollArea className="h-48 sm:h-72">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {videos.map((video: any) => (
                        <div key={video.id} className="aspect-video relative">
                          <video
                            src={video.url}
                            controls
                            className="w-full h-full rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
              {images.length === 0 && videos.length === 0 && (
                <p className="text-gray-500">No media available</p>
              )}
            </section>

            <Separator className="my-4 sm:my-6" />

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <BookOpen className="mr-2" size={24} />
                Stories
              </h2>
              <div className="space-y-4">
                {stories.map((story: { title: string; text: string }, index: number) => (
                  <StoryModal key={index} story={story} />
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>


    </div>
  )
}

