import React, { useState, useEffect } from 'react';
import api from '../api';
import Event from '../components/Event';
import './Events.css';

interface EventType {
  id: number;
  name: string;
  created: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getEvents = () => {
    api.get('/api/events/').then((res) => res.data).then((data) => {
      setEvents(data);
    }).catch((err) => alert(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-page">
      <h2>Events</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="event-container">
        {filteredEvents.map((e) => (
          <Event e={e} key={e.id} />
        ))}
      </div>
    </div>
  );
};

export default Events;
