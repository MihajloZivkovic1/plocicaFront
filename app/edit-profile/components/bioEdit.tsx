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
import { BioWalkthrough } from '@/components/ui/BioWalkthrough';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function BioEdit({ id }: { id: string | undefined }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false)


  const [text, setText] = useState('');
  const { toast } = useToast()

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profiles/profile/${id}`);
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
      const response = await fetch(`http://localhost:3000/profiles/edit/bio/${id}`, {
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
      <Collapsible
        open={isWalkthroughOpen}
        onOpenChange={setIsWalkthroughOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full">
            <span>Šta je biografija i kako da je unesem?</span>
            {isWalkthroughOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <BioWalkthrough />
        </CollapsibleContent>
      </Collapsible>


      <Card className="w-full max-w-3xl mx-auto mt-6">
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

