import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const event = searchParams.get('event');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let sql = `
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
      WHERE 1=1
    `;
    const params: any[] = [];

    if (event && event !== 'all') {
      sql += ` AND le.id = ?`;
      params.push(event);
    }

    if (startDate) {
      sql += ` AND le.draw_date >= ?`;
      params.push(startDate);
    }

    if (endDate) {
      sql += ` AND le.draw_date <= ?`;
      params.push(endDate);
    }

    sql += ` ORDER BY w.created_at DESC`;

    const winners = await query(sql, params);

    return NextResponse.json({ winners });
  } catch (error) {
    console.error('Failed to fetch winners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch winners' },
      { status: 500 }
    );
  }
} 