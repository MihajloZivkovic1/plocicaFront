'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { StoryWalkthrough } from '@/components/ui/StoryWalkthrough'
import { StoryList } from '@/components/ui/StoryList'

interface Story {
  id: string;
  title: string;
  text: string;
}

export default function ProfileStories({ id }: { id: string | undefined }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState({ title: '', text: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  useEffect(() => {
    fetchStories();
  }, [id]);

  const fetchStories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/stories/${id}`);
      const data = await response.json();
      setStories(data.stories);
    } catch (error) {
      console.error("Error fetching stories", error);
    }
  };

  const addNewStory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/stories/create/${id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: newStory.title,
          text: newStory.text
        })
      });

      if (!response.ok) {
        throw new Error("Greška pri pravljenju priče");
      }

      const createdStory = await response.json();
      setStories((prevStories) => [createdStory.story, ...prevStories]);
      setNewStory({ title: '', text: '' });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating story", error);
    }
  };

  const deleteStory = async (storyId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/stories/${storyId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId: storyId })
      });

      if (response.ok) {
        setStories((prevStories) => prevStories.filter((story) => story.id !== storyId));
        console.log("Priča uspešno obrisana");
      } else {
        console.error("Greška pri brisanju priče");
      }
    } catch (error) {
      console.error("Greška pri brisanju priče", error);
    }
  };

  const updateStory = async (storyId: string, updatedTitle: string, updatedText: string) => {
    try {
      const response = await fetch(`http://localhost:3000/stories/${storyId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: updatedTitle,
          text: updatedText
        })
      });

      if (response.ok) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.id === storyId ? { ...story, title: updatedTitle, text: updatedText } : story
          )
        );
        console.log("Priča uspešno ažurirana");
      } else {
        console.error("Greška pri ažuriranju priče");
      }
    } catch (error) {
      console.error("Greška pri ažuriranju priče", error);
    }
  };

  return (
    <div className="space-y-6">
      <Collapsible
        open={isWalkthroughOpen}
        onOpenChange={setIsWalkthroughOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full">
            <span>Kako da kreiram zanimljive priče pokojnika?</span>
            {isWalkthroughOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <StoryWalkthrough />
        </CollapsibleContent>
      </Collapsible>

      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold mb-2">Priče, uspomene i anegdote</CardTitle>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Dodaj novu priču
          </Button>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <div className="space-y-4 mb-6">
              <Input
                placeholder="Naslov priče"
                value={newStory.title}
                onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
              />
              <Textarea
                placeholder="Tekst priče"
                value={newStory.text}
                onChange={(e) => setNewStory({ ...newStory, text: e.target.value })}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreating(false)}>Odustani</Button>
                <Button onClick={addNewStory}>Sačuvaj priču</Button>
              </div>
            </div>
          )}
          <StoryList stories={stories} onDelete={deleteStory} onUpdate={updateStory} />
        </CardContent>
      </Card>
    </div>
  );
}

