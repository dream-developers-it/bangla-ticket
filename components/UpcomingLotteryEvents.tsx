'use client';
import { useState, useEffect } from 'react';
import { FaCalendar, FaClock, FaUsers, FaGift } from 'react-icons/fa';
import { LotteryEvent } from '@/types/database';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

interface TransformedEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  drawDateTime: string;
  participants: number;
  status: 'ACTIVE' | 'COMPLETED';
  ticketPrice: string;
  prizePool: string;
  category: string;
}

const EventCard = ({ event }: { event: TransformedEvent }) => (
  <div className="bg-blue-700/50 backdrop-blur-sm rounded-xl p-6">
    <div className="flex items-start gap-3 mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <FaGift className="text-yellow-400 text-xl" />
          <h3 className="text-xl font-bold text-white">{event.name}</h3>
        </div>
        <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm mt-2">
          {event.category}
        </span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-green-400">{event.prizePool}</div>
        <span className="text-yellow-400 text-sm">Ticket: {event.ticketPrice}</span>
      </div>
    </div>

    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2 text-white/80">
        <FaCalendar className="text-blue-400" />
        <span>{event.date} at {event.time}</span>
      </div>
      <div className="bg-blue-800/50 rounded-lg px-4 py-3">
        <CountdownTimer 
          targetDate={event.drawDateTime}
          className="text-lg"
        />
      </div>
      <div className="flex items-center gap-2 text-white/80">
        <FaUsers className="text-blue-400" />
        <span>{event.participants.toLocaleString()} participants</span>
      </div>
    </div>

    <Link
      href={`/tickets/buy?event=${event.id}`}
      className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg text-center transition-colors"
    >
      Buy Ticket
    </Link>
  </div>
);

const UpcomingLotteryEvents = () => {
  const [events, setEvents] = useState<TransformedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json() as LotteryEvent[];
        
        // Transform the data
        const transformedEvents = data.map(event => ({
          id: event.id,
          name: event.name,
          category: event.name.includes('Scholarship') ? 'Scholarship' :
                   event.name.includes('BPL') ? 'BPL Winner' :
                   event.name.includes('Weekly') ? 'Weekly Draw' : 'Monthly Draw',
          date: new Date(event.draw_date).toLocaleDateString(),
          time: new Date(event.draw_date).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          drawDateTime: event.draw_date,
          participants: event.ticket_count - event.remaining_tickets,
          status: event.status,
          ticketPrice: `₹${Number(event.ticket_price).toLocaleString()}`,
          prizePool: `₹${Number(event.prize_amount).toLocaleString()}`
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading events...</div>;
  }

  return (
    <>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
};

export default UpcomingLotteryEvents; 