
import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import 'md-editor-rt/lib/preview.css';
import { Input } from './ui/input';
import { Collapsible, CollapsibleContent } from './ui/collapsible';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { DropdownMenuLabel } from './ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, Trash2 } from 'lucide-react';


interface Story {
  id: string;
  title: string;
  text: string
}

export default function ProfileStories({ id }: { id: string | undefined }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [storyMessages, setStoryMessages] = useState<Record<string, string>>({});
  const [hiddenEditors, setHiddenEditors] = useState<Record<number, boolean>>({});


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`https://plocicaapi.onrender.com/stories/${id}`)
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
      const response = await fetch(`https://plocicaapi.onrender.com/stories/create/${id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: 'Naslov',
          text: "Tekst"
        })
      });

      if (!response.ok) {
        throw new Error("Greška pri pravljenju priče");
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
      const response = await fetch(`https://plocicaapi.onrender.com/stories/${storyId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId: storyId })
      })

      if (response.ok) {
        setStories((prevStories) => prevStories.filter((story) => story.id !== storyId))
        console.log("Story deleted succesfully");

      }
      else {
        console.error("Greška pri birsanju priče");
      }
    } catch (error) {
      console.error("Greška pri birsanju priče", error)
    }

  }
  //sortirati po created  at i da bude na vrhu liste taj i editovanje i rendering
  //da li je title promenjen ili text promenjen dozvoliti dugme update
  const updateStory = async (storyId: string) => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/stories/${storyId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: title,
          text: text
        })
      })

      const updatedStory = await response.json();
      console.log(updatedStory);
      if (response.ok) {
        setStories((prevStories) =>
          prevStories.map((story) =>
            story.id === storyId ? { ...story, title, text: story.text } : story
          )
        );

        setStoryMessages((prev) => ({
          ...prev,
          [storyId]: "Uspešno sačuvana priča!",
        }));

        setTimeout(() => {
          setStoryMessages((prev) => {
            const updatedMessages = { ...prev };
            delete updatedMessages[storyId];
            return updatedMessages;
          });
        }, 3000);
      }
    } catch (error) {
      console.error(error)
    }
  }
  const toggleMdEditor = (index: number) => {
    setHiddenEditors((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div>
      <Collapsible className="grid">
        <CollapsibleTrigger asChild>
          <Button className="w-full justify-start text-left font-semibold">
            Kako da kreiram zanimljive priče pokojnika?
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <p className="text-sm leading-loose text-gray-500 md:text-base dark:text-gray-400">
            Na stranici za uređivanje priče pokojnika, dostupno je polje za unos naslova priče i teksta:
            <br />
            <strong>1. Dugme za dodavanje nove Priče:</strong> Kliknite dugme <em>Dodaj Priču</em> da bi ste dodali novi prozor koji predstavlja jednu priču
            <br />
            <strong>2. U delu za naslov dodajte naslov priče:</strong>
            <br />
            <strong>3. U delu za tekst priče napisite kratak tekst o nekoj zanimljivoj priči pokojnika</strong>
            <br />
            <strong>4. Dugme za čuvanje nove Priče:</strong> Kliknite dugme <em>Sačuvaj</em> da bi ste sačuvali.
            <br />
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardHeader className='flex flex-row justify-between'>
          <CardTitle className="text-2xl font-bold mt-2">Uredi Priče</CardTitle>
          <Button onClick={addNewStory}>Dodaj novu Priču</Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-4 flex flex-col-reverse">
            {stories.length === 0 ? (
              <p>Ne postoje priče</p>
            ) : (
              stories.map((story: Story, index) => (
                <div key={`${story.id}-${index}`} className="border m-5 rounded-md shadow-md">
                  <div className="flex flex-row justify-between">
                    <DropdownMenuLabel className='m-4'>Naslov Priče</DropdownMenuLabel>
                    <Button className='m-4' variant={'ghost'}
                      onClick={() => toggleMdEditor(index)}
                    >
                      <ArrowDown className='m-3' width={30} />
                    </Button>
                  </div>
                  <Input
                    type="text"
                    defaultValue={story.title}
                    className="m-2 w-300 m-4"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className={hiddenEditors[index] ? 'hidden' : ''}>
                    <MdEditor
                      modelValue={story.text}
                      onChange={setText}
                      preview={false}
                      style={{ height: '300px' }}
                      toolbars={['bold', 'underline', 'italic']}
                    />
                  </div>

                  {
                    storyMessages[story.id] && (
                      <div
                        className={`p-4 mb-4 text-sm rounded-lg mt-3 ${storyMessages[story.id].includes("Uspešno")
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                          }`}
                        role="alert"
                      >
                        <span>{storyMessages[story.id]}</span>
                      </div>
                    )
                  }
                  < div className='flex justify-evenly' >
                    <Button onClick={() => deleteStory(story.id)} variant={'destructive'} className='m-4 w-full'>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => updateStory(story.id)} className='m-4 w-full'>Sačuvaj</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent >
      </Card >



    </div >
  );
}