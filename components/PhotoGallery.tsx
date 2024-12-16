import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Media {
  id: string;
  url: string;
  fileName: string;
}

interface PhotoGalleryProps {
  media: Media[];
  onDelete: (id: string) => void;
}

export function PhotoGallery({ media, onDelete }: PhotoGalleryProps) {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  if (media.length === 0) {
    return <p className="text-center text-gray-500">No photos available</p>;
  }

  const handleMouseEnter = (id: string) => {
    setHoveredPhoto(id);
  };

  const handleMouseLeave = () => {
    setHoveredPhoto(null);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onDelete(id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((photo) => (
        <div
          key={photo.id}
          className="group relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => handleMouseEnter(photo.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (hoveredPhoto === photo.id) {
              setHoveredPhoto(null);
            } else {
              setHoveredPhoto(photo.id);
            }
          }}
        >
          <div className="relative w-full pb-[100%]">
            <Image
              src={photo.url}
              alt={photo.fileName}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-lg"
            />
          </div>
          {hoveredPhoto === photo.id && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              <Button
                variant="destructive"
                size="icon"
                onClick={(e) => handleDeleteClick(photo.id, e)}
                className="rounded-full p-2"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
