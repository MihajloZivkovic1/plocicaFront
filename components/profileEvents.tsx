"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { EventWalkthrough } from '@/components/ui/EventWalkthrough'
import { EventList } from '@/components/ui/EventList'


interface Event {
  id: string
  title: string
  location: string
  dateOfEvent: string
  timeOfEvent: string
}

const pomeni = [
  { id: 1, title: "Četrdesetodnevni pomen" },
  { id: 2, title: "Šestomesečni pomen" },
  { id: 3, title: "Godišnji pomen" },
  { id: 4, title: "Pomen na Zadušnice" },
  { id: 5, title: "Specijalni pomen" },
]

export default function ProfileEvents({ id }: { id: string | undefined }) {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", location: "", date: "", time: "" })
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false)



  console.log(events);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`)
      const data = await response.json()

      if (Array.isArray(data)) {
        setEvents(data.map(event => ({
          ...event,
          dateOfEvent: event.dateOfEvent.split('T')[0],
        })))
      } else {
        setEvents([])
      }

    } catch (error) {
      console.error("Error fetching events", error)
      toast({
        title: "Greška",
        description: "Nije moguće učitati pomene. Pokušajte ponovo kasnije.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [id])


  const addNewEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Greška",
        description: "Sva polja moraju biti popunjena.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/events/create/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          profileId: id,
          title: newEvent.title,
          location: newEvent.location || "Unesite Lokaciju",
          dateOfEvent: newEvent.date,
          timeOfEvent: newEvent.time.slice(0, 5),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create new event");
      }

      const createdEvent = await response.json();

      const normalizedEvent = {
        ...createdEvent.event,
        dateOfEvent: createdEvent.event.dateOfEvent.split("T")[0],
      };

      console.log('createdEvent:', createdEvent)
      console.log('normalizedEvent:', normalizedEvent)

      setEvents((prevEvents) => [normalizedEvent, ...prevEvents]);
      setNewEvent({ title: "", location: "", date: "", time: "" });
      setIsCreating(false);
      toast({
        title: "Uspeh",
        description: "Uspešno ste dodali novi Pomen!",
      });
    } catch (error) {
      console.error("Error creating event", error);
      toast({
        title: "Greška",
        description: "Greška pri dodavanju novog Pomena",
        variant: "destructive",
      });
    }
  };



  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: eventId })
      })

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
        toast({
          title: "Uspeh",
          description: "Uspešno ste obrisali Pomen!",
        })
      } else {
        throw new Error("Failed to delete event")
      }
    } catch (error) {
      console.error("Error deleting event", error)
      toast({
        title: "Greška",
        description: "Greška pri brisanju Pomena",
        variant: "destructive",
      })
    }
  }

  const updateEvent = async (eventId: string, updatedEvent: Partial<Event>) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          ...updatedEvent,
          timeOfEvent: updatedEvent.timeOfEvent
        })
      });

      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? {
              ...event,
              ...updatedEvent
            } : event
          )
        );
        toast({
          title: "Uspeh",
          description: "Uspešno promenjen Pomen",
        });
      }
    } catch (error) {
      console.error("Error updating event", error);
      toast({
        title: "Greška",
        description: "Greška pri promeni Pomena",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Collapsible
        open={isWalkthroughOpen}
        onOpenChange={setIsWalkthroughOpen}
        className="w-full bg-white"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full rounded-lg hover:bg-gray-50">
            <span className="text-gray-700">Šta je pomen i kako da ga unesem?</span>
            {isWalkthroughOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <EventWalkthrough />
        </CollapsibleContent>
      </Collapsible>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">Pomeni</CardTitle>
          <Button
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Dodaj novi pomen
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          {isCreating && (
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <Input
                placeholder="Naziv pomena"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="border-gray-300"
              />
              <Input
                placeholder="Lokacija pomena"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="border-gray-300"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="border-gray-300"
                />
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  className="hover:bg-gray-100"
                >
                  Odustani
                </Button>
                <Button
                  onClick={addNewEvent}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Sačuvaj pomen
                </Button>
              </div>
            </div>
          )}
          <EventList events={events} onDelete={deleteEvent} onUpdate={updateEvent} pomeni={pomeni} />
        </CardContent>
      </Card>
    </div>
  )
}










//EVENTS
//title
//location
//dateOfEvent
//timeOfEvent
//linkofEvent




// const updateEvent = async (eventId: string) => {
//   try {

//     const formattedTime = time.includes(":") && time.split(":").length === 2 ? `${time}:00` : time;
//     const formattedDate = "2024-02-01"

//     const response = await fetch(`http://localhost:3000/events/${eventId}`, {
//       method: "PUT",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         profileId: id,
//         title: title,
//         location: location,
//         dateOfEvent: date,
//         timeOfEvent: new Date(`${formattedDate}T${formattedTime}`)
//       })
//     })

//     if (response.ok) {

//       toast({
//         title: "Success",
//         description: "Uspešno promenjen Pomen",
//       })
//     }
//     else {
//       toast({
//         title: "Error",
//         description: "Greška pri promeni Pomena",
//         variant: "destructive",
//       })
//     }
//   } catch {
//     toast({
//       title: "Error",
//       description: "Greška pri promeni Pomena",
//       variant: "destructive",
//     })
//   }
// }

// import { EventWalkthrough } from '@/components/ui/EventWalkthrough'
// import { EventList } from '@/components/ui/EventList'

// const addNewEvent = async () => {
//   const formattedTime = newEvent.time.includes(":") && newEvent.time.split(":").length === 2 ? `${newEvent.time}:00` : newEvent.time;
//   const formattedDate = "2024-02-01"
//   console.log(newEvent.time);

//   try {
//     const response = await fetch(`http://localhost:3000/events/create/${id}`, {
//       method: "POST",
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         profileId: id,
//         title: newEvent.title,
//         location: newEvent.location || 'Unesite Lokaciju',
//         dateOfEvent: newEvent.date ? new Date(newEvent.date).toISOString() : new Date().toISOString(),
//         timeOfEvent: new Date(`${formattedDate}T${formattedTime}`)
//       })
//     })

//     if (!response.ok) {
//       throw new Error('Failed to create new event')
//     }

//     const createdEvent = await response.json()
//     setEvents((prevEvents) => [{ ...createdEvent.event, dateOfEvent: new Date(createdEvent.event.dateOfEvent) }, ...prevEvents])
//     setNewEvent({ title: "", location: "", date: "", time: "" })
//     setIsCreating(false)
//     console.log(createdEvent);
//     toast({
//       title: "Uspeh",
//       description: "Uspešno ste dodali novi Pomen!",
//     })
//   } catch (error) {
//     console.error("Error creating event", error)
//     toast({
//       title: "Greška",
//       description: "Greška pri dodavanju novog Pomena",
//       variant: "destructive",
//     })
//   }
// }
