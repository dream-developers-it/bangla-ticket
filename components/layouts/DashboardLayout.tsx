import React from 'react';
import Link from 'next/link';
import { FaHome, FaTicketAlt, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const menuItems = [
    { icon: <FaHome />, label: 'Dashboard', href: '/dashboard' },
    { icon: <FaTicketAlt />, label: 'My Tickets', href: '/dashboard/tickets' },
    { icon: <FaTrophy />, label: 'Winners', href: '/dashboard/winners' },
    { icon: <FaCog />, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Bangla Lottery</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button className="flex items-center gap-3 text-gray-700 hover:text-red-600">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 