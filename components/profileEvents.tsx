import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageAlert } from '@/components/ui/MessageAlert';

interface Event {
  id: string;
  title: string;
  location: string;
  dateOfEvent: string;
  timeOfEvent: string;
}

export default function ProfileEvents({ id }: { id: string | undefined }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://plocicaapi.onrender.com/events/${id}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, [id]);

  const addNewEvent = async () => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/events/create/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          profileId: id,
          title: 'Title of Event',
          location: 'Location of Event',
          dateOfEvent: new Date().toISOString().split('T')[0],
          timeOfEvent: new Date().toTimeString().split(' ')[0]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create new event');
      }

      const newEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, newEvent.event]);
      setSuccessMessage("Event created successfully");
    } catch (error) {
      console.error("Error creating event", error);
      setSuccessMessage("Failed to create event");
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/events/${eventId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: eventId })
      });

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        setSuccessMessage("Event deleted successfully");
      } else {
        setSuccessMessage("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event", error);
      setSuccessMessage("Error occurred while deleting event");
    }
  };

  const updateEvent = async (event: Event) => {
    try {
      const response = await fetch(`https://plocicaapi.onrender.com/events/${event.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: id,
          title: event.title,
          location: event.location,
          dateOfEvent: event.dateOfEvent,
          timeOfEvent: event.timeOfEvent
        })
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? { ...e, ...updatedEvent.event } : e))
        );
        setSuccessMessage("Event updated successfully");
      } else {
        setSuccessMessage("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event", error);
      setSuccessMessage("Error occurred while updating event");
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Events</h1>
        <Button onClick={addNewEvent}>Dodaj Dogadjaj</Button>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event: Event) => (
            <EventItem key={event.id} event={event} onDelete={deleteEvent} onUpdate={updateEvent} />
          ))
        )}
      </div>
      <MessageAlert type="success" message={successMessage} />
    </div>
  );
}

interface EventItemProps {
  event: Event;
  onDelete: (id: string) => void;
  onUpdate: (event: Event) => void;
}

function EventItem({ event, onDelete, onUpdate }: EventItemProps) {
  const [editedEvent, setEditedEvent] = useState(event);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border rounded-md shadow-md p-4">
      <Input
        type="text"
        name="title"
        value={editedEvent.title}
        className="mb-2"
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="location"
        value={editedEvent.location}
        className="mb-2"
        onChange={handleInputChange}
      />
      <Input
        type="date"
        name="dateOfEvent"
        value={editedEvent.dateOfEvent}
        className="mb-2"
        onChange={handleInputChange}
      />
      <Input
        type="time"
        name="timeOfEvent"
        value={editedEvent.timeOfEvent}
        className="mb-2"
        onChange={handleInputChange}
      />
      <div className='flex justify-end space-x-2 mt-2'>
        <Button onClick={() => onDelete(event.id)} variant="destructive">Obrisi Dogadjaj</Button>
        <Button onClick={() => onUpdate(editedEvent)}>Potvrdi izmenu</Button>
      </div>
    </div>
  );
}

