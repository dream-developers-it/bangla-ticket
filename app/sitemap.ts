import { MetadataRoute } from 'next'
import { query } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dreamdrawbd.com'

  // Get all active events
  const events = await query(`
    SELECT id, updated_at 
    FROM lottery_events 
    WHERE status = 'ACTIVE'
  `) as any[];

  // Get all winners
  const winners = await query(`
    SELECT created_at 
    FROM winners
  `) as any[];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ticket-events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/winners`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Dynamic event pages
    ...events.map((event: any) => ({
      url: `${baseUrl}/tickets/buy?event=${event.id}`,
      lastModified: new Date(event.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  ]
} 