import { FaCalendar, FaClock, FaUsers, FaTicketAlt } from 'react-icons/fa';
import Link from 'next/link';

interface LotteryEvent {
  id: number;
  name: string;
  date: string;
  time: string;
  prizePool: string;
  participants: number;
  status: 'upcoming' | 'active' | 'completed';
}

const lotteryEvents: LotteryEvent[] = [
  {
    id: 1,
    name: "Weekly Mega Draw",
    date: "2024-03-30",
    time: "20:00",
    prizePool: "₹1,000,000",
    participants: 1234,
    status: 'upcoming'
  },
  {
    id: 2,
    name: "Daily Lucky Draw",
    date: "2024-03-25",
    time: "15:00",
    prizePool: "₹500,000",
    participants: 856,
    status: 'active'
  },
  {
    id: 3,
    name: "Monthly Special",
    date: "2024-04-01",
    time: "18:00",
    prizePool: "₹5,000,000",
    participants: 2500,
    status: 'upcoming'
  }
];

const LotteryEvents = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lottery Events</h2>
        <Link 
          href="/tickets/buy"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaTicketAlt className="inline-block mr-2" />
          Buy Tickets
        </Link>
      </div>
      <div className="grid gap-4">
        {lotteryEvents.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-sm font-medium
                    ${event.status === 'active' ? 'bg-green-100 text-green-800' : 
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaCalendar className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="w-4 h-4 mr-2" />
                    <span>{event.participants.toLocaleString()} participants</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{event.prizePool}</div>
                <Link
                  href={`/tickets/buy?event=${event.id}`}
                  className={`
                    mt-4 inline-flex items-center px-4 py-2 rounded-lg text-white
                    ${event.status === 'completed' ? 
                      'bg-gray-400 cursor-not-allowed' : 
                      'bg-yellow-500 hover:bg-yellow-600'}
                  `}
                  {...(event.status === 'completed' && { 'aria-disabled': true })}
                >
                  <FaTicketAlt className="mr-2" />
                  {event.status === 'completed' ? 'Ended' : 'Buy Ticket'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryEvents; 