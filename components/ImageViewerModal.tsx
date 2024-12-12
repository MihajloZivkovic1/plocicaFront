import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string | null // Allow null to handle missing images
}

export function ImageViewerModal({ isOpen, onClose, imageUrl }: ImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-0">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <div className="relative aspect-square w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Preview"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No image available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
