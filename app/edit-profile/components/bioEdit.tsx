"use client"

import React, { useState, useEffect } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BioEdit({ id }: { id: string | undefined }) {
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
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
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
          />
        </div>
        <Button onClick={handleSave} className="w-full">Sačuvaj biografiju</Button>
      </CardContent>

    </Card>
  );
}

