'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Profile = {
  profile: {
    profileName: string;
    dateOfBirth: string | null;
    dateOfDeath: string | null;
    religion: string;
    placeOfBirth: string;
    placeOfDeath: string;
    text: string;
    photo: string | File;
  };
};

export default function GeneralEdit({ id }: { id: string }) {
  const { toast } = useToast()

  const [profile, setProfile] = useState<Profile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({
    profileName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    text: "",
  });

  const [formData, setFormData] = useState({
    profileName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    religion: '',
    placeOfBirth: '',
    placeOfDeath: '',
    text: '',
  })

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`https://plocicaapi.onrender.com/profiles/profile/${id}`);
      const data = await res.json();
      setProfile(data);
      const newImageUrl = data.profile.photo;
      setPreviewImage(newImageUrl + '?v=' + new Date().getTime());
    }
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        profileName: profile.profile.profileName || "",
        dateOfBirth: formatDateForInput(profile.profile.dateOfBirth) || "",
        dateOfDeath: formatDateForInput(profile.profile.dateOfDeath) || "",
        religion: profile.profile.religion || "",
        placeOfBirth: profile.profile.placeOfBirth || "",
        placeOfDeath: profile.profile.placeOfDeath || "",
        text: profile.profile.text || ""
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "text" && value.length < 10) {
        newErrors.text = "Text must be at least 10 characters long.";
      } else if (name === "text" && value.length > 255) {
        newErrors.text = "Text must be less than 255 characters long.";
      } else {
        newErrors.text = "";
      }
      return newErrors;
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);


      await handleSaveImage(file);
    }
  };

  const validateForm = () => {

    const newErrors = { profileName: "", dateOfBirth: "", dateOfDeath: "", text: "" };
    let isValid = true;
    const utc = new Date();
    utc.setUTCHours(0, 0, 0, 0);


    if (formData.profileName.trim() === "") {
      newErrors.profileName = "Morate uneti ime pokojnika";
      isValid = false;
    }

    if (formData.dateOfBirth && formData.dateOfDeath && formData.dateOfBirth > formData.dateOfDeath) {
      newErrors.dateOfBirth = "Datum rodjenja ne može da bude posle datuma smrti";
      newErrors.dateOfDeath = "Datum smrti ne može da bude pre datuma rodjenja";
      isValid = false;
    }

    if (formData.dateOfDeath) {
      const dateOfDeath = new Date(formData.dateOfDeath);
      if (dateOfDeath > utc) {
        newErrors.dateOfDeath = "Datum smrti ne može da bude u budućnosti";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Greška kod uredjivanja profila, molim vas pokušajte ponovo",
        variant: "destructive",
      })
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profileName', formData.profileName);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('dateOfDeath', formData.dateOfDeath);
      formDataToSend.append('religion', formData.religion);
      formDataToSend.append('placeOfBirth', formData.placeOfBirth);
      formDataToSend.append('placeOfDeath', formData.placeOfDeath);

      const response = await fetch(`https://plocicaapi.onrender.com/profiles/edit/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Greška kod uredjivanja profila, molim vas pokušajte ponovo');
      }
      setIsRedirecting(true);
      router.push(`/edit-profile/${id}?tab=bio`)

      toast({
        title: "Success",
        description: "Uspešno ste uredili profil!",
      })
      setErrors({ profileName: "", dateOfBirth: "", dateOfDeath: "", text: "" });

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating profile:', error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.error('Unexpected error:', error);

        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        })
      }
    }
    finally {
      if (!isRedirecting) {
        setIsLoading(false);
      }
    }
  };

  const handleSaveImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch(`https://plocicaapi.onrender.com/profiles/edit/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Greška pri updejtu slike');
      }

      toast({
        title: "Success",
        description: "Profilna slika promenjena uspesno!",
      })
    } catch (error) {
      console.error('Greška pri menjanju slike', error);
      toast({
        title: "Error",
        description: "Greška pri menjanju slike",
        variant: "destructive",
      })
    }
  };

  const formatDateForInput = (date: string | null) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Collapsible className="grid">
        <CollapsibleTrigger asChild>
          <Button className="w-full justify-start text-left font-semibold">
            Kako da uredim profil pokojnika?
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <p className="text-sm leading-loose text-gray-500 md:text-base dark:text-gray-400">
            Na stranici za uređivanje profila pokojnika, dostupna su sledeća polja za unos i izmene:
            <br />
            <strong>1. Fotografija:</strong> Kliknite na postojeću fotografiju da biste je izmenili ili dodali novu.
            <br />
            <strong>2. Ime i Prezime:</strong> Unesite ili izmenite ime i prezime pokojnika.
            <br />
            <strong>3. Datumi rođenja i smrti:</strong> Unesite datume u formatu (npr. DD.MM.GGGG).
            <br />
            <strong>4. Mesto rođenja i mesto smrti:</strong> Unesite lokaciju rođenja i lokaciju smrti.
            <br />
            <strong>5. Dugme za čuvanje podataka:</strong> Kliknite na dugme <em>Sačuvaj izmene na profilu</em> da biste sačuvali izmene i prešli na uređivanje biografije pokojnika.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Card className="w-full max-w-2xl mx-auto mt-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Uredjuj Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={previewImage ?? '/placeholder.svg'} alt="User profile photo" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button onClick={handleButtonClick} type='button'>
                Dodaj Sliku
              </Button>
              <input
                type="file"
                name='profilePhoto'
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor='profileName' className="text-sm font-medium">Ime i prezime pokojnika</label>
              <Input
                type="text"
                name="profileName"
                value={formData.profileName}
                onChange={handleInputChange}
                className="w-full"
                disabled={isLoading || isRedirecting}

              />
              {errors.profileName && <div className="text-red-500 text-sm">{errors.profileName}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor='dateOfBirth' className="text-sm font-medium">Datum rodjenja</label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={isLoading || isRedirecting}

                />
                {errors.dateOfBirth && <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>}
              </div>

              <div className="space-y-2">
                <label htmlFor='dateOfDeath' className="text-sm font-medium">Datum smrti</label>
                <Input
                  type="date"
                  name="dateOfDeath"
                  value={formData.dateOfDeath}
                  onChange={handleInputChange}
                  disabled={isLoading || isRedirecting}

                />
                {errors.dateOfDeath && <div className="text-red-500 text-sm">{errors.dateOfDeath}</div>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="religion" className="text-sm font-medium">Religija</label>
              <Input
                type="text"
                name="religion"
                onChange={handleInputChange}
                value={formData.religion}
                disabled={isLoading || isRedirecting}

              />
            </div>

            <div className="space-y-2">
              <label htmlFor="placeOfBirth" className="text-sm font-medium">Mesto rodjenja</label>
              <Input
                type="text"
                name="placeOfBirth"
                onChange={handleInputChange}
                value={formData.placeOfBirth}
                disabled={isLoading || isRedirecting}

              />
            </div>

            <div className="space-y-2">
              <label htmlFor="placeOfDeath" className="text-sm font-medium">Mesto smrti</label>
              <Input
                type="text"
                value={formData.placeOfDeath}
                onChange={handleInputChange}
                name="placeOfDeath"
                disabled={isLoading || isRedirecting}
              />
            </div>

            <Button type='submit' className="w-full" disabled={isLoading || isRedirecting}>
              {isLoading || isRedirecting ? (
                <>
                  <Spinner className='mr-2' />
                  {isRedirecting ? 'Čuvanje profila' : 'Čuvanje profila u toku...'}
                </>
              ) : (
                'Sačuvajte izmene na profilu '
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>

  );
}

