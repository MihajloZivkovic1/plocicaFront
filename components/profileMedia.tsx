'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

import { PhotoGallery } from './PhotoGallery';

interface Media {
  id: string;
  url: string;
  fileName: string;
}

export default function ProfileMedia({ id }: { id: string | undefined }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, [id]);

  const fetchMedia = async () => {
    if (!id) return;
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/media/${id}`);
      const data = await response.json();
      const mediaArray = data.media;
      if (Array.isArray(mediaArray)) {
        setMedia(mediaArray);
      } else {
        setMedia([]);
      }
    } catch (error) {
      console.error('Error fetching media', error);
      showToast('Error fetching media', 'error');
    }
  };

  const deleteMedia = async (mediaId: string) => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/media/${mediaId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId: mediaId }),
      });

      if (response.ok) {
        setMedia((prevMedia) => prevMedia.filter((media) => media.id !== mediaId));
        showToast('Photo deleted successfully', 'success');
      } else {
        showToast('Failed to delete photo', 'error');
      }
    } catch (error) {
      console.error('Error deleting media', error);
      showToast('Error deleting photo', 'error');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    console.log('Selected file:', file?.name, file?.size);

    if (file && id) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('media', file);
      formData.append('profileId', id);
      formData.append('mediaType', 'photo');
      formData.append('timestamp', Date.now().toString());


      try {
        const response = await fetch(`https://plocicaapi.onrender.com/media/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const newMedia = await response.json();
          setMedia((prevMedia) => [...prevMedia, newMedia.media]);
          showToast('Photo uploaded successfully', 'success');
        } else {
          showToast('Failed to upload photo', 'error');
        }
      } catch (error) {
        console.error('Error uploading photo', error);
        showToast('Error uploading photo', 'error');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    toast({
      title: type === 'success' ? 'Success' : 'Error',
      description: message,
      variant: type === 'success' ? 'default' : 'destructive',
    });
  };
  const uuid = self.crypto.randomUUID();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Slike</h1>
        <Button onClick={handleButtonClick} disabled={isUploading}>
          {isUploading ? (
            'Uploading...'
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Dodajte Sliku
            </>
          )}
        </Button>
        <input
          key={uuid}
          type="file"
          name="profilePhoto"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
          capture="environment"
        />
      </div>

      <PhotoGallery media={media} onDelete={deleteMedia} />
    </div>
  );
}
