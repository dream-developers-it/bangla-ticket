'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaTicketAlt, FaTrophy, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-blue-600 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white">
              Bangla Lottery
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/ticket-events" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-white transition-colors"
              >
                <FaTicketAlt />
                Buy Ticket
              </Link>
              <Link 
                href="/winners" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-white transition-colors"
              >
                <FaTrophy />
                Winners List
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700/95 backdrop-blur-sm fixed inset-0 z-50">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <Link 
              href="/ticket-events" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-white text-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FaTicketAlt />
              Buy Ticket
            </Link>
            <Link 
              href="/winners" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl text-white text-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FaTrophy />
              Winners List
            </Link>
          </div>
        </div>
      )}

      {/* Live Draws Bar */}
      <div className="bg-blue-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 text-white overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">Live Draws:</span>
            </div>
            <div className="flex gap-8">
              <span>Morning Draw | <span className="text-yellow-400">11:00 AM</span> | <span className="text-green-400">₹50,000</span></span>
              <span>Afternoon Draw | <span className="text-yellow-400">3:00 PM</span> | <span className="text-green-400">₹75,000</span></span>
              <span>Evening Draw | <span className="text-yellow-400">7:00 PM</span> | <span className="text-green-400">₹100,000</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 