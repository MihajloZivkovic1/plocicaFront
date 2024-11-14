"use client"
import React, { useState, useEffect } from 'react';
import { MdEditor, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Button } from '@/components/ui/button'




export default function BioEdit({ id }: { id: string | undefined }) {
  const [text, setText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      }
    };
    fetchBio();
  }, [id]);


  const handleSave = async () => {
    try {
      await fetch(`http://localhost:3000/profiles/edit/bio/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ bio: text }), // Wrap text in an object
      });

      setSuccessMessage("Text saved successfully!");
    } catch (error) {
      console.error("Error saving bio text:", error);
    }
  }

  return (
    <>
      <MdEditor modelValue={text} onChange={setText}></MdEditor>
      <Button onClick={handleSave} className='m-5'>Save Biography</Button>
      {successMessage && <p>{successMessage}</p>}
    </>
  );
}
