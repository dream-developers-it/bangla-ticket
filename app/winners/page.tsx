import { query } from '@/lib/db';
import WinnerCard from './components/WinnerCard';
import WinnerFilter from './components/WinnerFilter';

interface Winner {
  id: string;
  lottery_id: string;
  event_name: string;
  customer_name: string;
  ticket_number: string;
  prize_amount: number;
  draw_date: string;
}

async function getWinners() {
  const winners = await query(`
    SELECT 
      w.id,
      w.lottery_id,
      le.name as event_name,
      tr.customer_name,
      tr.ticket_number,
      w.prize_amount,
      le.draw_date
    FROM winners w
    JOIN lottery_events le ON w.lottery_id = le.id
    JOIN ticket_requests tr ON w.ticket_request_id = tr.id
    ORDER BY w.created_at DESC
  `) as Winner[];
  
  return winners;
}

export default async function WinnersPage() {
  const winners = await getWinners();

  return (
    <div className="min-h-screen bg-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-4xl">🏆</span>
            <h1 className="text-3xl font-bold text-white">Winners Gallery</h1>
          </div>
          <WinnerFilter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner) => (
            <WinnerCard key={winner.id} winner={winner} />
          ))}

          {winners.length === 0 && (
            <div className="col-span-full text-center py-12 bg-purple-800 rounded-lg">
              <p className="text-purple-200">No winners found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Lottery Winners - DreamDraw BD Winners Gallery',
  description: 'Check out our latest lottery winners and their prizes. Join DreamDraw BD today for your chance to win big in Bangladesh!',
  openGraph: {
    title: 'Lottery Winners - DreamDraw BD',
    description: 'See our latest lottery winners and their prizes. Your chance to win is just a ticket away!',
  }
}; 