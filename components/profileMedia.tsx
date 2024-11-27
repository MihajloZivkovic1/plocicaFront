import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Image from "next/image"
interface Media {
  id: string;
  url: string;
  fileName: string
}
export default function ProfileMedia({ id }: { id: string | undefined }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(selectedFile);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`http://localhost:3000/media/${id}`);
        const data = await response.json();
        const mediaArray = data.media;
        if (Array.isArray(mediaArray)) {
          setMedia(mediaArray);
        } else {
          setMedia([]);
        }
      } catch (error) {
        console.error("Error fetching media", error);
      }
    };
    fetchMedia();
  }, [id]);

  const deleteMedia = async (mediaId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/media/${mediaId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: mediaId })
      });

      if (response.ok) {
        setMedia((prevMedia) => prevMedia.filter((media) => media.id !== mediaId));
        console.log("Media deleted successfully");
      } else {
        console.error("Failed to delete media");
      }
    } catch (error) {
      console.error("Error deleting media", error);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file && id) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('media', file);
      formData.append('profileId', id);
      formData.append('mediaType', "photo")
      try {
        const response = await fetch(`http://localhost:3000/media/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const newMedia = await response.json();
          console.log(newMedia);
          setMedia((prevMedia) => [...prevMedia, newMedia.media]);
          setSelectedFile(null);
          console.log("Photo uploaded successfully");
        } else {
          console.error("Failed to upload photo");
        }
      } catch (error) {
        console.error("Error uploading photo", error);
      }
    }

  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // const uploadPhoto = async () => {
  //   if (!selectedFile || !id) return;


  // };

  return (
    <div>
      <div className="flex justify-evenly">
        <h1 className="text-2xl font-bold">Media/Photos</h1>
        <form>
          <Button onClick={handleButtonClick} type="button">
            Upload Image
          </Button>
          <input
            type="file"
            name="profilePhoto"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </form>
      </div>

      {/* {selectedFile && (
        <div className="mt-4">
          <p>Selected file: {selectedFile.name}</p>
          <Button onClick={uploadPhoto} className="mt-2">Submit Upload</Button>
        </div>
      )} */}

      <div className="space-y-4 mt-4 flex flex-col-reverse p-4">
        {media.length === 0 ? (
          <p>No media available</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {media.map((photo, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full pb-[100%] bg-gray-100">
                  <Image
                    src={photo.url}
                    alt={photo.fileName}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-2 text-center">
                  <Button onClick={() => deleteMedia(photo.id)} className="mt-2">Delete Photo</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}