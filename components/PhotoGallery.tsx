import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Media {
  id: string
  url: string
  fileName: string
}

interface PhotoGalleryProps {
  media: Media[]
  onDelete: (id: string) => void
}

export function PhotoGallery({ media, onDelete }: PhotoGalleryProps) {
  if (media.length === 0) {
    return <p className="text-center text-gray-500">No photos available</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((photo) => (
        <div key={photo.id} className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="relative w-full pb-[100%]">
            <Image
              src={photo.url}
              alt={photo.fileName}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-lg"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(photo.id)}
              className="rounded-full p-2"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

