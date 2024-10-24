import React from 'react';
import { Bot, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-400" />
            <span className="text-white font-bold text-xl">AutoBot Builder</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {['Dashboard', 'Create Bot', 'Documentation', 'Settings'].map((item) => (
              <button
                key={item}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden text-gray-300 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}