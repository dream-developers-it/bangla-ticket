import BuyTicketForm from '@/components/BuyTicketForm';
import { query } from '@/lib/db';
import { notFound } from 'next/navigation';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getEventDetails(eventId: string) {
  const result = await query(
    'SELECT * FROM lottery_events WHERE id = ? AND status = "ACTIVE"',
    [eventId]
  );
  const rows = result as any[];
  return rows[0];
}

export default async function BuyTicketPage({
  searchParams,
}: PageProps) {
  const eventId = searchParams?.event?.toString();
  
  if (!eventId) {
    notFound();
  }

  const event = await getEventDetails(eventId);
  
  if (!event) {
    notFound();
  }

  return <BuyTicketForm eventId={event.id} ticketPrice={event.ticket_price} />;
} 