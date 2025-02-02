'use client';
import { useState } from 'react';
import { FaTrophy, FaCalendar, FaTicketAlt, FaUser, FaCoins } from 'react-icons/fa';

interface Winner {
  id: number;
  date: string;
  eventName: string;
  winnerName: string;
  ticketNumber: string;
  prize: string;
  rank: number;
}

const WinnersPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const winners: Winner[] = [
    {
      id: 1,
      date: '3/20/2024',
      eventName: 'Scholarship Draw',
      winnerName: 'John Doe',
      ticketNumber: '123456',
      prize: '₹100,000',
      rank: 1
    },
    {
      id: 2,
      date: '3/19/2024',
      eventName: 'Weekly Mega Draw',
      winnerName: 'Jane Smith',
      ticketNumber: '789012',
      prize: '₹500,000',
      rank: 2
    },
    {
      id: 3,
      date: '3/18/2024',
      eventName: 'Monthly Special',
      winnerName: 'Mike Johnson',
      ticketNumber: '456789',
      prize: '₹1,000,000',
      rank: 3
    }
  ];

  const events = [
    'All Events',
    'Scholarship Draw',
    'Weekly Mega Draw',
    'Daily Lucky Draw',
    'Monthly Special'
  ];

  // Filter winners based on selected event and date range
  const filteredWinners = winners.filter(winner => {
    // Event filter
    if (selectedEvent !== 'All Events' && winner.eventName !== selectedEvent) {
      return false;
    }

    // Date range filter
    if (dateRange.start && new Date(winner.date) < new Date(dateRange.start)) {
      return false;
    }
    if (dateRange.end && new Date(winner.date) > new Date(dateRange.end)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 gap-8 p-8">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="text-white text-6xl flex items-center justify-center">
              {i % 2 === 0 ? <FaTicketAlt /> : <FaCoins />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header with Filters */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-800/90 to-indigo-800/90 backdrop-blur-md border-b border-white/10 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center mb-6">
              <FaTrophy className="text-yellow-500 text-4xl mr-3" />
              <h1 className="text-3xl font-bold text-white">Winners Gallery</h1>
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Event Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex justify-between items-center w-48 px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
                >
                  <span>{selectedEvent}</span>
                  <span className="ml-2">▼</span>
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl z-50 overflow-hidden">
                      {events.map((event) => (
                        <button
                          key={event}
                          className="block w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {event}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Date Inputs */}
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="px-4 py-2 bg-white/10 text-white rounded-full placeholder-white/50 border border-white/20 hover:bg-white/20 transition-colors"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                className="px-4 py-2 bg-white/10 text-white rounded-full placeholder-white/50 border border-white/20 hover:bg-white/20 transition-colors"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Winners Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWinners.map((winner) => (
              <div
                key={winner.id}
                className="relative group"
              >
                {/* Card Background with Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                
                {/* Card Content */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-colors">
                  {/* Rank Badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                      ${winner.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                        winner.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500' : 
                        'bg-gradient-to-r from-amber-500 to-amber-700'}
                    `}>
                      <FaTrophy className="text-white w-6 h-6" />
                    </div>
                  </div>

                  {/* Winner Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{winner.eventName}</h3>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      {winner.prize}
                    </div>
                  </div>

                  <div className="space-y-3 text-white/80">
                    <div className="flex items-center gap-3">
                      <FaUser className="w-4 h-4 text-purple-400" />
                      <span>{winner.winnerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaTicketAlt className="w-4 h-4 text-pink-400" />
                      <span>#{winner.ticketNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendar className="w-4 h-4 text-indigo-400" />
                      <span>{winner.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnersPage; 