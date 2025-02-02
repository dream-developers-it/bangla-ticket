'use client';
import { useState, useEffect } from 'react';
import { 
  FaTicketAlt, 
  FaClock, 
  FaUsers, 
  FaTrophy, 
  FaGift, 
  FaMoneyBillWave,
  FaRegClock 
} from 'react-icons/fa';
import { 
  GiPodiumWinner, 
  GiTicket, 
  GiMoneyStack, 
  GiReceiveMoney, 
  GiStarsStack,
  GiTwoCoins 
} from 'react-icons/gi';
import Link from 'next/link';
import { LotteryEvent } from '@/types/database';
import CountdownTimer from '@/components/CountdownTimer';

interface TransformedEvent {
  id: string;
  name: string;
  type: 'campaign' | 'regular';
  category: string;
  date: string;
  time: string;
  drawDateTime: string;
  price: string;
  prizePool: string;
  participants: number;
  status: 'ACTIVE' | 'COMPLETED';
}

const EventCard = ({ event }: { event: TransformedEvent }) => (
  <div className="bg-blue-700/50 rounded-xl p-6 hover:bg-blue-700/70 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2">
          {event.type === 'campaign' ? 
            <FaGift className="text-yellow-400 text-xl" /> :
            <FaMoneyBillWave className="text-yellow-400 text-xl" />
          }
          <h3 className="text-xl font-bold text-white">{event.name}</h3>
        </div>
        <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
          event.type === 'campaign' ? 
          'bg-purple-500/20 text-purple-200' : 
          'bg-blue-500/20 text-blue-200'
        }`}>
          {event.category}
        </span>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-green-400">{event.prizePool}</div>
        <span className="text-yellow-400 text-sm">Ticket: {event.price}</span>
      </div>
    </div>

    <div className="space-y-2 text-white/80 mb-4">
      <div className="flex items-center gap-2">
        <FaClock className="text-blue-400" />
        <span>{event.date} at {event.time}</span>
      </div>
      <CountdownTimer 
        targetDate={event.drawDateTime} 
        className="bg-blue-800/50 rounded-lg px-3 py-2"
      />
      <div className="flex items-center gap-2">
        <FaUsers className="text-blue-400" />
        <span>{event.participants.toLocaleString()} participants</span>
      </div>
    </div>

    <Link
      href={`/tickets/buy?event=${event.id}`}
      className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg text-center transition-colors"
    >
      <FaTicketAlt className="inline-block mr-2" />
      Buy Ticket
    </Link>
  </div>
);

const TicketEventsPage = () => {
  const [events, setEvents] = useState<TransformedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json() as LotteryEvent[];
        
        // Transform the data with proper type checking and parsing
        const transformedEvents: TransformedEvent[] = data.map(event => ({
          id: event.id,
          name: event.name,
          type: (event.name.toLowerCase().includes('scholarship') || 
                event.name.toLowerCase().includes('bpl')) 
                ? 'campaign' : 'regular',
          category: event.name.includes('Scholarship') ? 'Scholarship' :
                   event.name.includes('BPL') ? 'BPL Winner' :
                   event.name.includes('Weekly') ? 'Weekly Draw' : 'Monthly Draw',
          date: new Date(event.draw_date).toLocaleDateString(),
          time: new Date(event.draw_date).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          drawDateTime: event.draw_date,
          price: `₹${Number(event.ticket_price).toLocaleString()}`,
          prizePool: `₹${Number(event.prize_amount).toLocaleString()}`,
          participants: event.ticket_count - event.remaining_tickets,
          status: event.status
        }));

        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Background pattern icons array
  const patternIcons = [
    <GiTicket key="ticket" />,
    <GiMoneyStack key="money" />,
    <FaTrophy key="trophy" />,
    <GiReceiveMoney key="receive" />
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600">
      {/* Static Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="grid grid-cols-6 gap-8 p-8 opacity-[0.03]">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <span className="text-4xl text-white">
                  {patternIcons[i % patternIcons.length]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Header */}
        <div className="bg-blue-700 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Lottery Events</h1>
              <p className="text-white/80">Choose your lucky draw and try your fortune</p>
            </div>
          </div>
        </div>

        {/* Events Container */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Campaign Events */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                <GiPodiumWinner className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Campaign Events</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events
                .filter(event => event.type === 'campaign')
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>

          {/* Regular Events */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <GiTwoCoins className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Regular Events</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events
                .filter(event => event.type === 'regular')
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketEventsPage; 