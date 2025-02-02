'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import { FaTicketAlt } from 'react-icons/fa';
import { LotteryEvent } from '@/types/database';
import UpcomingLotteryEvents from '@/components/UpcomingLotteryEvents';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const [nextDraw, setNextDraw] = useState<LotteryEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextDraw = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const events = await response.json() as LotteryEvent[];
        const upcomingEvents = events
          .filter(event => new Date(event.draw_date) > new Date())
          .sort((a, b) => new Date(a.draw_date).getTime() - new Date(b.draw_date).getTime());
        
        if (upcomingEvents.length > 0) {
          setNextDraw(upcomingEvents[0]);
        }
      } catch (error) {
        console.error('Error fetching next draw:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextDraw();
  }, []);

  return (
    <div className="min-h-screen bg-blue-600">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Next Draw Section */}
        <div className="bg-blue-700/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Next Draw In:</h2>
          {nextDraw && (
            <>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">{nextDraw.name}</h3>
              <div className="bg-blue-800/50 rounded-2xl p-4 md:p-8 mb-8">
                <CountdownTimer 
                  targetDate={nextDraw.draw_date}
                  className="text-3xl md:text-5xl font-mono tracking-widest"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-8">
                <div className="bg-blue-900/50 px-6 py-3 rounded-lg">
                  <div className="text-sm text-white/70">Prize Pool</div>
                  <div className="text-xl md:text-2xl font-bold text-green-400">
                    ₹{Number(nextDraw.prize_amount).toLocaleString()}
                  </div>
                </div>
                <div className="bg-blue-900/50 px-6 py-3 rounded-lg">
                  <div className="text-sm text-white/70">Ticket Price</div>
                  <div className="text-xl md:text-2xl font-bold text-yellow-400">
                    ₹{Number(nextDraw.ticket_price).toLocaleString()}
                  </div>
                </div>
              </div>
              <Link 
                href={`/tickets/buy?event=${nextDraw.id}`}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 md:px-8 rounded-xl text-lg md:text-xl transition-all transform hover:scale-105"
              >
                <FaTicketAlt />
                Buy Ticket Now
              </Link>
            </>
          )}
        </div>

        {/* Upcoming Events Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpcomingLotteryEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 