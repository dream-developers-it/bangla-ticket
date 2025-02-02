import { eventService } from '@/services/eventService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await eventService.getAllEvents();
    const activeEvents = await eventService.getEventsByStatus('ACTIVE');
    
    const stats = {
      totalParticipants: events.reduce((acc, event) => 
        acc + (event.ticket_count - event.remaining_tickets), 0),
      activeEvents: activeEvents.length,
      totalPrizePool: events.reduce((acc, event) => 
        acc + Number(event.prize_amount), 0),
      upcomingDraws: events
        .filter(event => new Date(event.draw_date) > new Date())
        .sort((a, b) => new Date(a.draw_date).getTime() - new Date(b.draw_date).getTime())
        .slice(0, 3)
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 