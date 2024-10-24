import React from 'react';
import { Layout, Plus, Activity, Settings } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'create', label: 'Create Bot', icon: Plus },
    { id: 'status', label: 'Status', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex space-x-1 bg-gray-700/50 p-1 rounded-lg mb-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === id
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}