import { eventService } from '@/services/eventService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await eventService.getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 