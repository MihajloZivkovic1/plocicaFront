import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function profileEvents({ id }: { id: string | undefined }) {
  const [events, setEvents] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        const data = await response.json();


        const eventsArray = data;

        if (Array.isArray(data)) {
          setEvents(eventsArray);
        }
        else {
          setEvents([])
        }

      } catch (error) {
        console.error("Error fetching stories", error);
      }
    }
    fetchEvents();
  }, [id])

  const addNewEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/create/${id}`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          profileId: id,
          title: 'Title of Event',
          location: 'Location of Event',
          dateOfEvent: new Date(),
          timeOfEvent: ""
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create new event');
      }

      const newEvent = await response.json();
      console.log("new event", newEvent);
      setEvents((prevEvents) => [...prevEvents, newEvent.event])

    } catch (error) {
      console.error("Error creating event", error);
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
        console.log("Event deleted succesfully");

      }
      else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event", error)
    }

  }
  const updateEvent = async (eventId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: title,
          location: location,
          dateOfEvent: date,
          timeOfEvent: time
        })
      })

      const newStory = await response.json();
      console.log(newStory);
      if (response.ok) {
        console.log("Event updated succesfully");
      }
      else {
        console.log("failed");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div>
        <div className='flex justify-evenly'>
          <h1 className="text-2xl font-bold">Events</h1>
          <Button onClick={addNewEvent} className='ml-2'>Dodaj Dogadjaj</Button>
        </div>

        <div className="space-y-4 mt-4 flex flex-col-reverse">
          {events.length === 0 ? (
            <p>No events available</p>
          ) : (
            events.map((event: { id: string; title: string; location: string, dateOfEvent: Date, timeOfEvent: Date }, index) => (
              <div key={`${event.id}-${index}`} className="border m-5 rounded-md shadow-md">
                <Input
                  type="text"
                  defaultValue={event.title}
                  className="m-4 w-300"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  type="text"
                  defaultValue={event.location}
                  className="m-4 w-300"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Input
                  type="date"
                  defaultValue={event.dateOfEvent ? new Date(event.dateOfEvent).toISOString().split('T')[0] : ""}
                  className="m-4 w-300"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Input
                  type="time"
                  defaultValue={event.timeOfEvent ? event.timeOfEvent.toString() : ""}
                  className="m-4 w-300"
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className='flex justify-evenly'>
                  <Button onClick={() => deleteEvent(event.id)} variant={"destructive"} className='m-4'>Obrisi Dogadjaj</Button>
                  <Button onClick={() => updateEvent(event.id)} variant={"secondary"} className='m-4'>Potvrdi izmenu Dogadjaja</Button>


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