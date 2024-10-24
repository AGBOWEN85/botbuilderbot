import React, { useState } from 'react';
import BotBuilder from './components/BotBuilder';
import StatusDashboard from './components/StatusDashboard';
import Navbar from './components/Navbar';
import TabNavigation from './components/TabNavigation';
import SystemMetrics from './components/SystemMetrics';

function App() {
  const [activeTab, setActiveTab] = useState('builder');

  const renderMainContent = () => {
    switch (activeTab) {
      case 'builder':
        return <BotBuilder />;
      case 'status':
        return <StatusDashboard />;
      default:
        return <BotBuilder />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {renderMainContent()}
          </div>
          
          <div className="lg:w-1/3">
            <SystemMetrics />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;