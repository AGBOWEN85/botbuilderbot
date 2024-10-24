import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import VersionControl from './VersionControl';
import DeploymentSettings from './DeploymentSettings';

export default function StatusDashboard() {
  const botStatuses = [
    {
      name: 'Analysis Bot v2.1',
      status: 'active',
      uptime: '12d 4h',
      requests: '1.2M',
      icon: CheckCircle2,
      color: 'text-green-400',
      versions: [
        {
          id: '1',
          version: '2.1.0',
          timestamp: new Date(),
          changes: ['Improved analysis accuracy', 'Added support for new data types'],
          status: 'deployed',
          metrics: {
            performance: 98,
            reliability: 99,
            accuracy: 95
          }
        },
        {
          id: '2',
          version: '2.0.0',
          timestamp: new Date(Date.now() - 86400000),
          changes: ['Initial release with core functionality'],
          status: 'deployed',
          metrics: {
            performance: 92,
            reliability: 95,
            accuracy: 90
          }
        }
      ],
      currentVersion: '2.1.0',
      autoUpdate: true
    }
  ];

  const handleRollback = (botName: string, versionId: string) => {
    console.log(`Rolling back ${botName} to version ${versionId}`);
  };

  const handleAutoUpdateChange = (botName: string, enabled: boolean) => {
    console.log(`Auto-update for ${botName} ${enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-400" />
          Active Bots
        </h2>

        <div className="space-y-4">
          {botStatuses.map((bot) => {
            const Icon = bot.icon;
            return (
              <div key={bot.name}>
                <div className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${bot.color}`} />
                    <div>
                      <h3 className="text-white font-medium">{bot.name}</h3>
                      <p className="text-gray-400 text-sm">Status: {bot.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Uptime</div>
                      <div className="text-white font-medium">{bot.uptime}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Requests</div>
                      <div className="text-white font-medium">{bot.requests}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VersionControl
                    versions={bot.versions}
                    currentVersion={bot.currentVersion}
                    onRollback={(versionId) => handleRollback(bot.name, versionId)}
                  />
                  <DeploymentSettings
                    autoUpdate={bot.autoUpdate}
                    onAutoUpdateChange={(enabled) => handleAutoUpdateChange(bot.name, enabled)}
                    deploymentEnvironment="production"
                    onEnvironmentChange={() => {}}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}