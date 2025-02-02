export interface LotteryEvent {
  id: string;
  name: string;
  draw_date: string;
  status: 'ACTIVE' | 'COMPLETED';
  ticket_count: number;
  remaining_tickets: number;
  prize_amount: string | number;
  ticket_price: string | number;
  created_at: string;
}

export interface DatabaseError {
  code: string;
  message: string;
} 