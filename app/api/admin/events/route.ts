import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const events = await query(`
      SELECT 
        id, 
        name, 
        draw_date,
        prize_amount,
        ticket_price,
        status,
        remaining_tickets
      FROM lottery_events 
      WHERE status = 'ACTIVE' 
      ORDER BY draw_date ASC
    `);

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 