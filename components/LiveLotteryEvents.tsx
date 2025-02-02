import { FaClock } from 'react-icons/fa';
import Link from 'next/link';

const LiveLotteryEvents = () => {
  const liveEvents = [
    {
      id: 1,
      name: "Morning Draw",
      time: "11:00 AM",
      prize: "₹50,000"
    },
    {
      id: 2,
      name: "Afternoon Draw",
      time: "3:00 PM",
      prize: "₹75,000"
    },
    {
      id: 3,
      name: "Evening Draw",
      time: "7:00 PM",
      prize: "₹100,000"
    }
  ];

  return (
    <div className="bg-blue-900 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap">
            <span className="flex items-center font-semibold">
              <FaClock className="mr-2" /> Live Draws:
            </span>
            {liveEvents.map((event) => (
              <div key={event.id} className="flex items-center">
                <div className="text-sm">
                  <span className="font-medium">{event.name}</span>
                  <span className="mx-2">|</span>
                  <span className="text-yellow-400">{event.time}</span>
                  <span className="mx-2">|</span>
                  <span className="text-green-400">{event.prize}</span>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/tickets/buy" 
            className="text-sm bg-yellow-500 text-black px-3 py-1 rounded-full hover:bg-yellow-400 transition-colors whitespace-nowrap"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveLotteryEvents; 