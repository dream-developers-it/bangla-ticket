import { NextResponse } from 'next/server';
import { query, directQuery } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { sendSlackMessage } from '@/lib/slack';

function generateTicketNumber(eventId: string, index: number) {
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${eventId}-${dateStr}-${randomNum}`;
}

export async function POST(request: Request) {
  try {
    const { lotteryId, customerName, phoneNumber, numberOfTickets } = await request.json();

    // Check if tickets are available
    const eventResult = await query(
      'SELECT remaining_tickets FROM lottery_events WHERE id = ? AND status = "ACTIVE"',
      [lotteryId]
    ) as any[];

    if (!eventResult.length || eventResult[0].remaining_tickets < numberOfTickets) {
      return NextResponse.json(
        { error: 'Not enough tickets available' },
        { status: 400 }
      );
    }

    const successfulTickets = [];

    // Try to insert tickets
    for (let i = 0; i < numberOfTickets; i++) {
      let retries = 0;
      const maxRetries = 5;

      while (retries < maxRetries) {
        try {
          const ticketId = uuidv4();
          const ticketNumber = generateTicketNumber(lotteryId, i);

          // Insert ticket request without transaction
          await query(
            `INSERT INTO ticket_requests (
              id,
              lottery_id,
              customer_name,
              phone_number,
              ticket_number,
              status
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [ticketId, lotteryId, customerName, phoneNumber, ticketNumber, 'PENDING']
          );

          // Update remaining tickets
          await query(
            'UPDATE lottery_events SET remaining_tickets = remaining_tickets - 1 WHERE id = ? AND remaining_tickets > 0',
            [lotteryId]
          );

          successfulTickets.push(ticketNumber);
          break; // Exit the retry loop on success

        } catch (err: any) {
          if (err.code === 'ER_DUP_ENTRY') {
            retries++;
            if (retries === maxRetries) {
              throw new Error('Unable to generate unique ticket number after multiple attempts');
            }
            continue;
          }
          throw err;
        }
      }
    }

    if (successfulTickets.length !== numberOfTickets) {
      throw new Error('Failed to purchase all requested tickets');
    }

    // Send Slack notification
    const slackMessage = `
🎫 *New Ticket Purchase*
• Customer: ${customerName}
• Phone: ${phoneNumber}
• Number of Tickets: ${numberOfTickets}
• Ticket Numbers: ${successfulTickets.join(', ')}
• Total Amount: ₹${50 * numberOfTickets}
    `.trim();

    await sendSlackMessage(slackMessage);

    return NextResponse.json({ 
      success: true,
      tickets: successfulTickets,
      message: 'Thank you for your purchase! Our team will contact you shortly.' 
    });

  } catch (error: any) {
    console.error('Error purchasing tickets:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to purchase tickets. Please try again.',
        details: error.toString()
      },
      { status: 500 }
    );
  }
} 