'use client';
import { useEffect, useState } from 'react';
import { query } from '@/lib/db';
import DrawButton from './components/DrawButton';
import TicketStats from './components/TicketStats';
import EventFilter from './components/EventFilter';

interface Event {
  id: string;
  name: string;
  draw_date: string;
  prize_amount: number;
  ticket_price: number;
  status: string;
  remaining_tickets: number;
  stats?: TicketStats;
}

interface TicketStats {
  total: number;
  pending: number;
  confirmed: number;
  rejected: number;
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events');
      const data = await response.json();
      setEvents(data.events);
      if (data.events.length > 0) {
        handleEventChange(data.events[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = async (eventId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/events/${eventId}`);
      const data = await response.json();
      setSelectedEvent(data.event);
    } catch (error) {
      console.error('Failed to fetch event details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <form action="/api/admin/logout" method="POST">
              <button type="submit" className="px-4 py-2 text-sm text-red-600 hover:text-red-700">
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Event Overview */}
        <div className="mb-8 bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Event Overview</h2>
            <EventFilter events={events} onEventChange={handleEventChange} />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : selectedEvent ? (
            <div className="bg-white rounded-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{selectedEvent.name}</h2>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Draw Date</p>
                      <p className="font-medium">
                        {new Date(selectedEvent.draw_date).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Prize Amount</p>
                      <p className="font-medium">₹{selectedEvent.prize_amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ticket Price</p>
                      <p className="font-medium">₹{selectedEvent.ticket_price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining Tickets</p>
                      <p className="font-medium">{selectedEvent.remaining_tickets}</p>
                    </div>
                  </div>
                </div>
                <DrawButton eventId={selectedEvent.id} />
              </div>
              {selectedEvent.stats && <TicketStats stats={selectedEvent.stats} />}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select an event to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 