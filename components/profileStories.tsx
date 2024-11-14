
import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import CreateStoryModal from './CreateStoryModal';
import { MdEditor, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Input } from './ui/input';
export default function profileStories({ id }: { id: string | undefined }) {
  const [stories, setStories] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stories/${id}`)
        const data = await response.json();
        console.log(data);
        const storiesArray = data.stories
        setStories(storiesArray);
      } catch (error) {
        console.error("Error fetching stories", error);
      }
    }
    fetchStories();
  }, [id])

  const addNewStory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/stories/create/${id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: 'Title',
          text: "Text"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create a new story");
      }

      const newStory = await response.json();
      console.log("New story", newStory);
      setStories((prevStories) => [...prevStories, newStory.story]);
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
      })

      if (response.ok) {
        setStories((prevStories) => prevStories.filter((story) => story.id !== storyId))
        console.log("Story deleted succesfully");

      }
      else {
        console.error("Failed to delete story");
      }
    } catch (error) {
      console.error("Error deleting story", error)
    }

  }
  //sortirati po created  at i da bude na vrhu liste taj i editovanje i rendering
  //da li je title promenjen ili text promenjen dozvoliti dugme update
  const updateStory = async (storyId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/stories/${storyId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: title,
          text: text
        })
      })

      const newStory = await response.json();
      console.log(newStory);
      if (response.ok) {
        console.log("Story updated succesfully");
        setText(newStory.story.text)
      }
      else {
        console.log("fucked up");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className='flex justify-evenly'>
        <h1 className="text-2xl font-bold">Stories</h1>
        <Button onClick={addNewStory} className='ml-2'>Dodaj novu pricu</Button>
      </div>

      <div className="space-y-4 mt-4 flex flex-col-reverse">
        {stories.length === 0 ? (
          <p>No stories available</p>
        ) : (
          stories.map((story: { id: string; title: string; text: string }, index) => (
            <div key={`${story.id}-${index}`} className="border m-5 rounded-md shadow-md">
              <Input
                type="text"
                defaultValue={story.title}
                className="m-4 w-300"
                onChange={(e) => setTitle(e.target.value)} // Capture title changes
              />
              <MdEditor modelValue={story.text} onChange={setText} preview={false}></MdEditor>
              <div className='flex justify-evenly'>
                <Button onClick={() => deleteStory(story.id)} variant={'destructive'} className='m-4'>Delete Story</Button>
                <Button onClick={() => updateStory(story.id)} className='m-4'>Update Story</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div >
  );

}