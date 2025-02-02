'use client';
import { useState } from 'react';

interface Event {
  id: string;
  name: string;
}

interface FilterProps {
  events: Event[];
  onEventChange: (eventId: string) => void;
}

export default function EventFilter({ events, onEventChange }: FilterProps) {
  return (
    <div className="flex items-center gap-4">
      <select 
        onChange={(e) => onEventChange(e.target.value)}
        className="border rounded-lg px-4 py-2 min-w-[200px]"
        defaultValue=""
      >
        <option value="" disabled>Select Event</option>
        {events.map(event => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
} 