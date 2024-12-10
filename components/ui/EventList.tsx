import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Pencil, X, Check } from 'lucide-react'

interface Event {
  id: string
  title: string
  location: string
  dateOfEvent: string
  timeOfEvent: string
}

interface EventListProps {
  events: Event[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedEvent: Partial<Event>) => void
  pomeni: { id: number; title: string }[]
}

export function EventList({ events, onDelete, onUpdate, pomeni }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [editedEvent, setEditedEvent] = useState<Partial<Event>>({})

  const handleEdit = (event: Event) => {
    setEditingEvent(event.id);
    setEditedEvent({
      ...event,
      dateOfEvent: new Date(event.dateOfEvent).toISOString().split('T')[0],
      timeOfEvent: event.timeOfEvent?.split('T')[1].slice(0, 5) ? event.timeOfEvent?.split('T')[1].slice(0, 5) : ""
    });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setEditedEvent({})
  }

  const handleUpdate = (id: string) => {
    const updatedEvent: Partial<Event> = {
      ...editedEvent,
      dateOfEvent: `${editedEvent.dateOfEvent}T00:00:00.000Z`,
      timeOfEvent: `${editedEvent.dateOfEvent}T${editedEvent.timeOfEvent}`,
    };

    onUpdate(id, updatedEvent);
    setEditingEvent(null);
    setEditedEvent({});
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>
              {editingEvent === event.id ? (
                <Select
                  onValueChange={(value) => setEditedEvent({ ...editedEvent, title: value })}
                  defaultValue={editedEvent.title}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Izaberite vrstu pomena" />
                  </SelectTrigger>
                  <SelectContent>
                    {pomeni.map((pomen) => (
                      <SelectItem key={pomen.id} value={pomen.title}>
                        {pomen.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                event.title
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {editingEvent === event.id ? (
              <>
                <Input
                  placeholder="Lokacija"
                  value={editedEvent.location || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                />
                <Input
                  type="date"
                  value={editedEvent.dateOfEvent || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, dateOfEvent: e.target.value })}
                />
                <Input
                  type="time"
                  value={editedEvent.timeOfEvent || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, timeOfEvent: e.target.value })}
                />
              </>
            ) : (
              <>
                <p><strong>Lokacija:</strong> {event.location}</p>
                <p><strong>Datum:</strong> {new Date(event.dateOfEvent).toLocaleDateString()}</p>
                <p><strong>Vreme:</strong> {event.timeOfEvent?.slice(11, 16) ? event.timeOfEvent?.slice(11, 16) : ""}</p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {editingEvent === event.id ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 mr-2" />
                  Odustani
                </Button>
                <Button size="sm" onClick={() => handleUpdate(event.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Sačuvaj
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Izmeni
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(event.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Obriši
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

