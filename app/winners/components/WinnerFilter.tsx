'use client';

export default function WinnerFilter() {
  return (
    <div className="flex items-center gap-4">
      <select 
        className="bg-purple-800 text-white border border-purple-600 rounded-lg px-4 py-2"
        defaultValue="all"
      >
        <option value="all">All Events</option>
        <option value="recent">Recent Winners</option>
        <option value="highest">Highest Prize</option>
      </select>

      <input 
        type="date" 
        className="bg-purple-800 text-white border border-purple-600 rounded-lg px-4 py-2"
      />

      <input 
        type="date" 
        className="bg-purple-800 text-white border border-purple-600 rounded-lg px-4 py-2"
      />
    </div>
  );
} 