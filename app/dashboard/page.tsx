import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const adminSession = await cookieStore.get('admin_session');
  
  if (!adminSession?.value) {
    redirect('/dashboard/login');
  }

  const handleLogout = async () => {
    'use server';
    // cookies().delete('admin_session');
    redirect('/dashboard/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <form action={handleLogout}>
              <button 
                type="submit"
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Welcome to the admin panel</h2>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
} 