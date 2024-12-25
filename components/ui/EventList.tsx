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
      dateOfEvent: event.dateOfEvent ? new Date(event.dateOfEvent).toISOString().split('T')[0] : "",
      timeOfEvent: event.timeOfEvent ? event.timeOfEvent.slice(0, 5) : ""
    });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setEditedEvent({})
  }

  const handleUpdate = (id: string) => {
    const updatedEvent: Partial<Event> = {
      ...editedEvent,
      dateOfEvent: editedEvent.dateOfEvent,
      timeOfEvent: editedEvent.timeOfEvent
    };

    onUpdate(id, updatedEvent);
    setEditingEvent(null);
    setEditedEvent({});
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>
              {editingEvent === event.id ? (
                <Input
                  value={editedEvent.title || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                  placeholder="Naziv pomena"
                  className="text-lg font-semibold"
                />
              ) : (
                <div className="text-xl font-semibold text-gray-800">{event.title}</div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {editingEvent === event.id ? (
              <div className="space-y-4">
                <Input
                  placeholder="Lokacija"
                  value={editedEvent.location || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                  className="border-gray-300"
                />
                <Input
                  type="date"
                  value={editedEvent.dateOfEvent || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, dateOfEvent: e.target.value })}
                  className="border-gray-300"
                />
                <Input
                  type="time"
                  value={editedEvent.timeOfEvent || ''}
                  onChange={(e) => setEditedEvent({ ...editedEvent, timeOfEvent: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            ) : (
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center"><span className="font-medium min-w-24">Lokacija:</span> {event.location || 'Nije unesena lokacija'}</p>
                <p className="flex items-center"><span className="font-medium min-w-24">Datum:</span> {event.dateOfEvent ? new Date(event.dateOfEvent).toLocaleDateString() : 'Nije unesen datum'}</p>
                <p className="flex items-center"><span className="font-medium min-w-24">Vreme:</span> {event.timeOfEvent ? event.timeOfEvent.slice(0, 5) : '00:00'}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 bg-gray-50 rounded-b-lg">
            {editingEvent === event.id ? (
              <>
                <Button size="sm" variant="outline" onClick={handleCancelEdit} className="hover:bg-gray-100">
                  <X className="h-4 w-4 mr-2" />
                  Odustani
                </Button>
                <Button size="sm" onClick={() => handleUpdate(event.id)} className="bg-blue-500 hover:bg-blue-600">
                  <Check className="h-4 w-4 mr-2" />
                  Sačuvaj
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="hover:bg-gray-100">
                  <Pencil className="h-4 w-4 mr-2" />
                  Izmeni
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(event.id)} className="bg-red-500 hover:bg-red-600">
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

