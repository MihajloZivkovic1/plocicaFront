'use client'

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageIcon, Film } from 'lucide-react'
import Image from "next/image"
import { ImageViewerModal } from "@/components/ImageViewerModal"

interface MediaItem {
  id: string
  url: string
}

interface GalleryProps {
  images: MediaItem[]
  videos: MediaItem[]
}

export function Gallery({ images, videos }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
        <ImageIcon className="mr-2" size={24} />
        Galerija
      </h2>
      {images.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Slike</h3>
          <ScrollArea className="h-48 sm:h-72">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {images.map((image: MediaItem, index: number) => (
                <div
                  key={image.id}
                  className="aspect-square relative cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
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
            Video
          </h3>
          <ScrollArea className="h-48 sm:h-72">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {videos.map((video: MediaItem) => (
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
        <p className="text-gray-500">Nema Slika</p>
      )}
      <ImageViewerModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ''}
      />
    </section>
  )
}

