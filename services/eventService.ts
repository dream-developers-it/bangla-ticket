import { LotteryEvent } from '@/types/database';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const eventService = {
  // Get all events
  async getAllEvents(): Promise<LotteryEvent[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM lottery_events WHERE status = "ACTIVE" ORDER BY draw_date ASC'
      );
      return rows as LotteryEvent[];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get event by ID
  async getEventById(id: string): Promise<LotteryEvent | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM lottery_events WHERE id = ? AND status = "ACTIVE"',
        [id]
      );
      return rows[0] as LotteryEvent || null;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  // Get events by status
  async getEventsByStatus(status: 'ACTIVE' | 'COMPLETED'): Promise<LotteryEvent[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM lottery_events WHERE status = ? ORDER BY draw_date ASC',
        [status]
      );
      return rows as LotteryEvent[];
    } catch (error) {
      console.error('Error fetching events by status:', error);
      throw error;
    }
  },

  // Update remaining tickets
  async updateRemainingTickets(eventId: string, ticketsPurchased: number): Promise<boolean> {
    try {
      const [result] = await pool.execute(
        'UPDATE lottery_events SET remaining_tickets = remaining_tickets - ? WHERE id = ? AND status = "ACTIVE" AND remaining_tickets >= ?',
        [ticketsPurchased, eventId, ticketsPurchased]
      );
      return true;
    } catch (error) {
      console.error('Error updating tickets:', error);
      throw error;
    }
  },

  // Check ticket availability
  async checkTicketAvailability(eventId: string, requestedTickets: number): Promise<boolean> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT remaining_tickets FROM lottery_events WHERE id = ? AND status = "ACTIVE"',
        [eventId]
      );
      
      if (!rows[0]) return false;
      return rows[0].remaining_tickets >= requestedTickets;
    } catch (error) {
      console.error('Error checking ticket availability:', error);
      throw error;
    }
  }
}; 