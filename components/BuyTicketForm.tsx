'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner, FaTicketAlt, FaUser, FaPhone, FaRegListAlt } from 'react-icons/fa';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface BuyTicketFormProps {
  eventId: string;
  ticketPrice: number;
}

const BuyTicketForm = ({ eventId, ticketPrice }: BuyTicketFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [tickets, setTickets] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    numberOfTickets: 1
  });

  const handleNumberOfTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = parseInt(value);
    
    // Only update if it's a valid positive number
    if (value === '' || number > 0) {
      setFormData({ ...formData, numberOfTickets: value === '' ? 1 : number });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.customerName.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter your full name'
      });
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter your phone number'
      });
      return;
    }

    // Phone number validation (assuming Bangladesh format)
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid Bangladesh phone number'
      });
      return;
    }

    // Validate number of tickets
    if (!formData.numberOfTickets || formData.numberOfTickets < 1) {
      setMessage({
        type: 'error',
        text: 'Please enter at least 1 ticket'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // First check remaining tickets
      const checkResponse = await fetch(`/api/tickets/check?eventId=${eventId}`);
      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        throw new Error(checkData.error || 'Failed to check ticket availability');
      }

      if (checkData.remainingTickets < formData.numberOfTickets) {
        setMessage({
          type: 'error',
          text: `Only ${checkData.remainingTickets} tickets available`
        });
        return;
      }

      // Proceed with purchase
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lotteryId: eventId,
          customerName: formData.customerName,
          phoneNumber: formData.phoneNumber,
          numberOfTickets: formData.numberOfTickets
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to purchase ticket');
      }

      // Redirect to confirmation page with ticket numbers
      router.push(`/tickets/confirmation?tickets=${data.tickets.join(',')}`);
      
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to purchase ticket. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = ticketPrice * (formData.numberOfTickets || 0);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <Navbar />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.2) 2%, transparent 0%),
            radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.2) 2%, transparent 0%)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 shadow-lg transform transition-transform hover:scale-105">
              <FaTicketAlt className="text-white text-3xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Buy Lottery Ticket
          </h2>

          {message.text && (
            <div className={`p-6 rounded-xl mb-6 ${
              message.type === 'success' 
                ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200'
            }`}>
              <div className="flex items-start">
                <div className={`rounded-full p-2 ${
                  message.type === 'success' ? 'bg-green-200' : 'bg-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <FaTicketAlt className="text-green-700 text-xl" />
                  ) : (
                    <FaRegListAlt className="text-red-700 text-xl" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className={`font-semibold ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {message.text}
                  </p>
                  {tickets.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-3">Your ticket numbers:</p>
                      <div className="grid gap-2">
                        {tickets.map((ticket, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-green-200"
                          >
                            <div className="bg-green-100 rounded-full p-2">
                              <FaTicketAlt className="text-green-600" />
                            </div>
                            <div>
                              <span className="font-mono text-sm text-gray-500">Ticket #{index + 1}</span>
                              <p className="font-mono font-medium text-gray-900">{ticket}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Important:</span> Please save your ticket numbers. 
                          Our team will contact you shortly on your provided phone number.
                        </p>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => {
                            setMessage({ type: '', text: '' });
                            setTickets([]);
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
                        >
                          <FaRegListAlt /> Buy Another Ticket
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customerName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaUser className="text-blue-500" />
                Full Name
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaPhone className="text-blue-500" />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="numberOfTickets" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaRegListAlt className="text-blue-500" />
                Number of Tickets
              </label>
              <div className="relative">
                <input
                  id="numberOfTickets"
                  name="numberOfTickets"
                  type="number"
                  min="1"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.numberOfTickets}
                  onChange={handleNumberOfTicketsChange}
                  onBlur={() => {
                    if (!formData.numberOfTickets || formData.numberOfTickets < 1) {
                      setFormData({ ...formData, numberOfTickets: 1 });
                    }
                  }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Enter the number of tickets you want to purchase
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FaTicketAlt className="text-blue-500" />
                  Price per ticket:
                </span>
                <span className="font-semibold">₹{ticketPrice}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-blue-600">₹{totalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-150 hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Processing...
                </>
              ) : (
                <>
                  <FaTicketAlt className="mr-2" /> Purchase Ticket
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicketForm; 