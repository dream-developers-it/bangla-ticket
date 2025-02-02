'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DrawButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDraw = async () => {
    if (!confirm('Are you sure you want to draw winners for this event?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to draw winners');
      }

      alert('Winner drawn successfully!');
      router.refresh();
      window.location.reload(); // Force reload to update the UI
    } catch (error: any) {
      alert(error.message || 'Failed to draw winners. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDraw}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Drawing...' : 'Draw Winners'}
    </button>
  );
} 