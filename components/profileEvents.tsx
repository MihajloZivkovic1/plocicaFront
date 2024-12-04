import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DropdownMenuLabel } from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  location: string;
  dateOfEvent: Date;
  timeOfEvent: string;
}


const pomeni = [
  { id: 1, title: "Četrdesetodnevni pomen" },
  { id: 2, title: "Šestomesečni pomen" },
  { id: 3, title: "Godišnji pomen" },
  { id: 4, title: "Pomen na Zadušnice" },
  { id: 5, title: "Specijalni pomen" },
];


export default function ProfileEvents({ id }: { id: string | undefined }) {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");



  const handleTitleChange = (value: string) => {
    setTitle(value)
    console.log(title);
  }


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://plocicaapi.onrender.com/events/${id}`);
        const data = await response.json();


        const eventsArray = data;

        if (Array.isArray(data)) {
          setEvents(eventsArray);
        }
        else {
          setEvents([])
        }

      } catch (error) {
        console.error("Error fetching events", error);
      }
    }
    fetchEvents();
  }, [id])

  const addNewEvent = async () => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/events/create/${id}`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          profileId: id,
          title,
          location: 'Unesite Lokaciju',
          dateOfEvent: new Date(),
          timeOfEvent: ""
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create new event');
      }

      const newEvent = await response.json();
      setTitle(title);
      setEvents((prevEvents) => [...prevEvents, newEvent.event])

      toast({
        title: "Success",
        description: "Uspesno ste dodali novi Pomen!",
      })


    } catch (error) {
      console.error("Error creating event", error);
      toast({
        title: "Error",
        description: "Greška pri dodavanju novog Pomena",
        variant: "destructive",
      })
    }

  };
  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/events/${eventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: eventId })
      })

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
        console.log("Event deleted succesfully");
        toast({
          title: "Success",
          description: "Uspešno ste obrisali Pomen!",
        })
      }
      else {
        toast({
          title: "Error",
          description: "Greška pri brisanju Pomena",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Greška pri brisanju Pomena",
        variant: "destructive",
      })
    }

  }

  const updateEvent = async (eventId: string) => {
    try {

      const formattedTime = time.includes(":") && time.split(":").length === 2 ? `${time}:00` : time;
      const formattedDate = "2024-02-01"

      const response = await fetch(`https://plocicaapi.onrender.com/events/${eventId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: title,
          location: location,
          dateOfEvent: date,
          timeOfEvent: new Date(`${formattedDate}T${formattedTime}`)
        })
      })

      if (response.ok) {

        toast({
          title: "Success",
          description: "Uspešno promenjen Pomen",
        })
      }
      else {
        toast({
          title: "Error",
          description: "Greška pri promeni Pomena",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Greška pri promeni Pomena",
        variant: "destructive",
      })
    }
  }
  <Plus size={40} strokeWidth={3} />

  return (
    <div>
      <Collapsible className="grid">
        <CollapsibleTrigger asChild>
          <Button className="w-full justify-start text-left font-semibold">
            Šta je pomen i kako da ga unesem?
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <p className="text-sm leading-loose text-gray-500 md:text-base dark:text-gray-400">
            <strong>Šta je pomen?</strong>
            <br />
            Pomen je verski obred i čin sećanja na preminulu osobu, koji se obavlja u skladu sa običajima i tradicijom. Obično se organizuje na određene datume, kao što su četrdesetodnevni pomen, šestomesečni pomen ili godišnjica smrti.
            <br /><br />
            <strong>Kako da unesem pomen?</strong>
            <br />
            Na stranici za uređivanje pomena možete:
            <br />
            <strong>1. Kliknite na plus:</strong> Dodajte novi pomen klikom na plusić.
            <br />
            <strong>2. Izabrati vrstu pomena:</strong> Odaberite koji je pomen u pitanju, npr. četrdesetodnevni, godišnji, ili drugi.
            <br />
            <strong>3. Uneti lokaciju pomena:</strong> Na primer, dodatne informacije o mestu.
            <br />
            <strong>4. Vreme i datum:</strong> Unesite tačan datum i vreme kada će pomen biti održan.
            <br />
            <strong>5. Dugme za čuvanje:</strong> Kliknite na <em>Sačuvaj</em> kako biste sačuvali detalje o pomenima i nastavili dalje.
          </p>
        </CollapsibleContent>
      </Collapsible>
      <div>
        <div className='flex justify-evenly align-center'>
          <h1 className="text-3xl font-bold mt-5">Pomeni</h1>
          <Plus size={40} strokeWidth={3} onClick={addNewEvent} className='mt-4'>Dodaj Pomen</Plus>
        </div>

        <div className="space-y-4 mt-4 flex flex-col-reverse">
          {events.length === 0 ? (
            <p>Trenutno nemate ni jedan pomen, kliknite na plusić iznad kako biste ga kreirali</p>
          ) : (
            events.map((event: Event, index) => (
              <div key={`${event.id}-${index}`} className="border p-4 rounded-md shadow-md">
                <DropdownMenuLabel>
                  Vrsta Pomena
                </DropdownMenuLabel>
                <Select
                  onValueChange={handleTitleChange}
                  defaultValue={event.title}
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <SelectValue placeholder="Izaberite pomen" />
                  </SelectTrigger>
                  <SelectContent>
                    {pomeni.map((pomen) => (
                      <SelectItem key={pomen.id} value={pomen.title}>
                        {pomen.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <DropdownMenuLabel >
                  Lokacija Pomena
                </DropdownMenuLabel>
                <Input
                  type="text"
                  defaultValue={event.location}
                  className="w-full"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <DropdownMenuLabel >
                  Datum Pomena
                </DropdownMenuLabel>
                <Input
                  type="date"
                  defaultValue={event.dateOfEvent ? new Date(event.dateOfEvent).toISOString().split('T')[0] : ""}
                  className="w-300"
                  onChange={(e) => setDate(e.target.value)}
                />
                <DropdownMenuLabel >
                  Vreme Pomena
                </DropdownMenuLabel>
                <Input
                  type="time"
                  defaultValue={
                    event.timeOfEvent
                      ? new Date(event.timeOfEvent).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                      : ""
                  }
                  className="w-300"
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className='flex justify-end space-x-2 mt-2 p-5'>
                  <Button
                    onClick={() => deleteEvent(event.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Delete event</span>
                  </Button>
                  <Button onClick={() => updateEvent(event.id)}>Sačuvaj</Button>
                </div>
              </div>
            ))
          )}
        </div>

      </div >

    </div>
  )
}
//EVENTS
//title
//location
//dateOfEvent
//timeOfEvent
//linkofEvent