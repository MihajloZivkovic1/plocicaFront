import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, X, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
interface Story {
  id: string;
  title: string;
  text: string;
}

interface StoryListProps {
  stories: Story[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, text: string) => void;
}

export function StoryList({ stories, onDelete, onUpdate }: StoryListProps) {
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const { toast } = useToast();


  const handleEdit = (story: Story) => {
    setEditingStory(story.id);
    setEditedTitle(story.title);
    setEditedText(story.text);
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setEditedTitle("");
    setEditedText("");
  };

  const handleUpdate = (id: string) => {
    if (!editedTitle.trim()) {
      toast({
        title: "Greška",
        description: "Naslov priče ne može biti prazan",
        variant: "destructive",
      });
      return;
    }
    if (editedTitle.length > 100) {
      toast({
        title: "Greška",
        description: "Naslov priče ne može biti duži od 100 karaktera",
        variant: "destructive",
      });
      return;
    }
    onUpdate(id, editedTitle.trim(), editedText.trim());
    setEditingStory(null);
  };


  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <Card key={story.id}>
          <CardHeader>
            <CardTitle>
              {editingStory === story.id ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="font-bold"
                />
              ) : (
                story.title
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingStory === story.id ? (
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={4}
              />
            ) : (
              <p className="whitespace-pre-wrap">
                {story.text.length > 20 ? `${story.text.slice(0, 20)}...` : story.text}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {editingStory === story.id ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Odustani
                </Button>
                <Button size="sm" onClick={() => handleUpdate(story.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Sačuvaj
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => handleEdit(story)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Izmeni
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(story.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Obriši
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

