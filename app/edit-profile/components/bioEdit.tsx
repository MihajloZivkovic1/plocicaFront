"use client"

import React, { useState, useEffect } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { useRouter } from 'next/navigation';

export default function BioEdit({ id }: { id: string | undefined }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const [text, setText] = useState('');
  const { toast } = useToast()

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(`https://plocicaapi.onrender.com/profiles/profile/${id}`);
        const data = await response.json();
        if (data && data.profile.bio) {
          setText(data.profile.bio);
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
        toast({
          title: "Error",
          description: "Greška pri učitavanju biografije. Molimo pokušajte ponovo.",
          variant: "destructive",
        })
      }
    };
    fetchBio();
  }, [id, toast]);

  const handleSave = async () => {

    setIsLoading(true);
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/profiles/edit/bio/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ bio: text }),
      });

      if (!response.ok) {
        throw new Error('Greška pri čuvanju biografije');
      }
      setIsRedirecting(true);
      router.push(`/edit-profile/${id}?tab=events`)

      toast({
        title: "Success",
        description: "Biografija je uspešno sačuvana!",
      })
    } catch (error) {
      console.error("Error saving bio text:", error);
      toast({
        title: "Error",
        description: "Greška pri čuvanju biografije. Molimo pokušajte ponovo.",
        variant: "destructive",
      })
    }
    finally {
      if (!isRedirecting) {
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <Collapsible className="grid">
        <CollapsibleTrigger asChild>
          <Button className="w-full justify-start text-left font-semibold">
            Kako da uredim biografiju pokojnika?
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <p className="text-sm leading-loose text-gray-500 md:text-base dark:text-gray-400">
            Na stranici za uređivanje biografije pokojnika, dostupno je polje za uredjivanje teksta:
            <br />
            <strong>1. Tekst:</strong> Kliknite na postojeći tekstualni editor da biste je izmenili ili dodali novu biografiju. U tekst editoru je moguće podebljati ili podvuci tekst.
            <br />
            <strong>2. Dugme za čuvanje biografije:</strong> Kliknite na dugme <em>Sačuvaj biografiju</em> da biste sačuvali izmene i prešli na uređivanje pomena za pokojnika.
            <br />
          </p>
        </CollapsibleContent>
      </Collapsible>


      <Card className="w-full max-w-3xl mx-auto mt-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Uredi Biografiju</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="md-editor-container">
            <MdEditor
              preview={false}
              modelValue={text}
              onChange={setText}
              style={{ height: '300px' }}
              toolbars={[
                'bold',
                'underline',
                'italic',
              ]}
              disabled={isLoading || isRedirecting}
            />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={isLoading || isRedirecting}>
            {isLoading || isRedirecting ? (
              <>
                <Spinner className='mr-2' />
                {isRedirecting ? 'Čuvanje biografije' : 'Čuvanje biografije u toku'}
              </>
            ) : (
              'Sačuvaj biografiju'
            )}


          </Button>
        </CardContent>

      </Card>
    </>

  );
}

