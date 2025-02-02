import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  _request: Request,
  context: { params: { eventId: string } }
) {
  try {
    // Get event details
    const eventId = context.params.eventId;
    const [event] = await query(`
      SELECT 
        id, 
        name, 
        draw_date,
        prize_amount,
        ticket_price,
        status,
        remaining_tickets
      FROM lottery_events 
      WHERE id = ?
    `, [eventId]) as any[];

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get ticket statistics
    const [stats] = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'CONFIRMED' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) as rejected
      FROM ticket_requests 
      WHERE lottery_id = ?
    `, [eventId]) as any[];

    event.stats = stats;

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Failed to fetch event details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event details' },
      { status: 500 }
    );
  }
}