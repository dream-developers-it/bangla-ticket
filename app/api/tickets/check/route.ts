import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'SELECT remaining_tickets FROM lottery_events WHERE id = ? AND status = "ACTIVE"',
      [eventId]
    ) as any[];

    if (!result.length) {
      return NextResponse.json(
        { error: 'Event not found or not active' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      remainingTickets: result[0].remaining_tickets
    });

  } catch (error) {
    console.error('Error checking tickets:', error);
    return NextResponse.json(
      { error: 'Failed to check ticket availability' },
      { status: 500 }
    );
  }
} 