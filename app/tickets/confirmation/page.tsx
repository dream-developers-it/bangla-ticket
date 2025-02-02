'use client';
import { useSearchParams } from 'next/navigation';
import { FaTicketAlt, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const tickets = searchParams.get('tickets')?.split(',') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Purchase!</h1>
            <p className="text-gray-600 mt-2">Our team will contact you shortly.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Ticket Numbers:</h2>
            <div className="grid gap-3">
              {tickets.map((ticket, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="bg-blue-100 rounded-full p-3">
                    <FaTicketAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Ticket #{index + 1}</div>
                    <div className="font-mono text-lg font-medium text-gray-900">{ticket}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Please save your ticket numbers for reference</li>
              <li>• Our team will contact you on your provided phone number</li>
              <li>• Keep your phone accessible for verification</li>
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return Home
            </Link>
            <Link
              href="/ticket-events"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Buy More Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 