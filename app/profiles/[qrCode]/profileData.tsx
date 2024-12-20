
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import StoryModal from '@/components/ui/modal'
import { Book, Calendar, BookOpen, MapPin } from 'lucide-react'
import { fetchMedia } from '@/app/lib/fetchMedia'
import InteractiveImage from '@/components/ui/InteractiveImage'
import { Gallery } from '@/components/ui/Gallery'


interface MediaItem {
  mediaType: 'photo' | 'video';
  url: string;
  id: string;
}

interface Story {
  title: string;
  text: string;
}

interface Event {
  title: string;
  location: string;
  dateOfEvent: string;
  timeOfEvent: string
}

async function fetchProfileData(qrCode: string) {
  const res = await fetch(`https://plocicaapi.onrender.com/profiles/${qrCode}`)
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
  const images = mediaArray.filter((item: MediaItem) => item.mediaType === 'photo');
  const videos = mediaArray.filter((item: MediaItem) => item.mediaType === 'video');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "/")
  }

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <InteractiveImage profile={profile} />



      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <MapPin className="mr-2" size={24} />
                Mesto Rođenja
              </h2>
              <div className="space-y-2">
                <p className="text-lg sm:text-base flex items-center">
                  <Calendar className="mr-2" size={20} />
                  {formatDate(profile.dateOfBirth)}
                </p>
                <p className="text-lg sm:text-base flex items-center">
                  <MapPin className="mr-2" size={20} />
                  {profile.placeOfBirth}
                </p>
              </div>
            </section>


            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <MapPin className="mr-2" size={24} />
                Mesto Smrti
              </h2>
              <div className="space-y-2">
                <p className="text-lg sm:text-base flex items-center">
                  <Calendar className="mr-2" size={20} />
                  {formatDate(profile.dateOfDeath)}
                </p>
                <p className="text-lg sm:text-base flex items-center">
                  <MapPin className="mr-2" size={20} />
                  {profile.placeOfDeath}
                </p>
              </div>
            </section>

            <Separator className="my-4 sm:my-6" />
            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <Book className="mr-2" size={24} />
                Biografija
              </h2>
              <div className="prose max-w-none text-lg sm:text-base">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {profile?.bio || 'No detailed biography available'}
                </ReactMarkdown>
              </div>
            </section>

            <Separator className="my-4 sm:my-6" />

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <Calendar className="mr-2" size={24} />
                Pomeni
              </h2>
              <div className="space-y-4">
                {events.map((event: Event, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="text-lg sm:text-lg font-semibold">{event.title}</h3>
                      <p className="text-lg sm:text-lg text-gray-600">{formatDate(event.dateOfEvent)}</p>
                      <p className="text-lg sm:text-lg text-gray-600">{event.location}</p>
                      <p className="text-lg sm:text-lg text-gray-600">{formatTime(event.timeOfEvent)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-4 sm:my-6" />

            <Gallery images={images} videos={videos} />


            <Separator className="my-4 sm:my-6" />

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
                <BookOpen className="mr-2" size={24} />
                Priče,Anegdote,Secanja
              </h2>
              <div className="space-y-4">
                {stories.map((story: Story, index: number) => (
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

