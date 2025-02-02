interface StatsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    rejected: number;
  };
}

export default function TicketStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Total Tickets</p>
        <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-sm text-yellow-600">Pending</p>
        <p className="text-2xl font-semibold text-yellow-700">{stats.pending}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600">Confirmed</p>
        <p className="text-2xl font-semibold text-green-700">{stats.confirmed}</p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-sm text-red-600">Rejected</p>
        <p className="text-2xl font-semibold text-red-700">{stats.rejected}</p>
      </div>
    </div>
  );
} 