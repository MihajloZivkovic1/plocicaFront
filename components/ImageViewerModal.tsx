import React from 'react'
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from 'lucide-react'

interface ImageViewerModalProps {
  isOpen: boolean,
  onClose: () => void,
  imageUrl: string
}
export default function ImageViewerModal({ isOpen, onClose, imageUrl }: ImageViewerModalProps) {

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[90vw] sm:max-h-[90vh] p-0'>
          <button onClick={onClose} className='absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="relative w-full h-[90vh]">
            <Image
              src={imageUrl}
              alt="Enlarged view"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
