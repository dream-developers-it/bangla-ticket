import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const adminSession = await cookieStore.get('admin_session');
  
  if (!adminSession?.value) {
    redirect('/dashboard/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to the admin panel</h2>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
} 