interface WinnerCardProps {
  winner: {
    event_name: string;
    prize_amount: number;
    customer_name: string;
    ticket_number: string;
    draw_date: string;
  };
}

export default function WinnerCard({ winner }: WinnerCardProps) {
  return (
    <div className="bg-purple-800 rounded-lg p-6 transform hover:scale-105 transition-transform duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {winner.event_name}
          </h2>
          <p className="text-2xl font-bold text-green-400">
            ₹{winner.prize_amount.toLocaleString()}
          </p>
        </div>
        <span className="text-4xl">🏆</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-purple-300">👤</span>
          <p className="text-white">{winner.customer_name}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-300">🎫</span>
          <p className="text-purple-200">{winner.ticket_number}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-300">📅</span>
          <p className="text-purple-200">
            {new Date(winner.draw_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 