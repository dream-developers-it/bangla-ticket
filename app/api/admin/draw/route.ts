import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendSlackMessage } from '@/lib/slack';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { eventId } = await request.json();

    // Get all confirmed tickets for this event
    const tickets = await query(
      'SELECT * FROM ticket_requests WHERE lottery_id = ? AND status = "CONFIRMED"',
      [eventId]
    ) as any[];

    if (!tickets.length) {
      return NextResponse.json(
        { error: 'No confirmed tickets found for this event' },
        { status: 400 }
      );
    }

    // Get event details
    const [event] = await query(
      'SELECT prize_amount FROM lottery_events WHERE id = ?',
      [eventId]
    ) as any[];

    // Randomly select winner
    const winner = tickets[Math.floor(Math.random() * tickets.length)];

    // Update event status
    await query(
      'UPDATE lottery_events SET status = "COMPLETED" WHERE id = ?',
      [eventId]
    );

    // Record winner
    await query(
      `INSERT INTO winners (id, lottery_id, ticket_request_id, prize_amount) 
       VALUES (?, ?, ?, ?)`,
      [uuidv4(), eventId, winner.id, event.prize_amount]
    );

    // Send Slack notification
    const winnerMessage = `
🎉 *Winner Drawn for Event ${eventId}*
• Winner Ticket: ${winner.ticket_number}
• Customer Name: ${winner.customer_name}
• Phone Number: ${winner.phone_number}
• Prize Amount: ₹${event.prize_amount}
    `.trim();

    await sendSlackMessage(winnerMessage);

    return NextResponse.json({ success: true, winner });

  } catch (error) {
    console.error('Draw error:', error);
    return NextResponse.json(
      { error: 'Failed to draw winner' },
      { status: 500 }
    );
  }
} 