import React from 'react';
import { Shield, AlertTriangle, Archive, RefreshCw } from 'lucide-react';
import { useRecovery } from '../hooks/useRecovery';

export default function SystemRecovery() {
  const { recoveryState, errorLogs, backups, triggerRecovery, createBackup } = useRecovery();

  const handleManualRecovery = async () => {
    await triggerRecovery([{ type: 'manual', message: 'Manual recovery triggered' }]);
  };

  const handleCreateBackup = async () => {
    await createBackup();
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        System Recovery
      </h3>

      <div className="space-y-6">
        {/* System Status */}
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {recoveryState.status === 'stable' ? (
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
              )}
              <span className="text-white font-medium">System Status</span>
            </div>
            <span className="text-sm text-gray-300 capitalize">{recoveryState.status}</span>
          </div>

          {recoveryState.activeRecovery && (
            <div className="mt-2 text-sm text-gray-400">
              Recovery in progress... Started {new Date(recoveryState.activeRecovery.startTime).toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Recent Errors */}
        <div>
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Recent Errors
          </h4>
          <div className="space-y-2">
            {errorLogs.slice(-3).map((log, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs
                    ${log.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      log.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'}
                  `}>
                    {log.severity}
                  </span>
                  <span className="text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">{log.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backups */}
        <div>
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <Archive className="w-4 h-4 text-blue-400" />
            System Backups
          </h4>
          <div className="space-y-2">
            {backups.slice(-3).map((backup, index) => (
              <div key={backup.id} className="bg-gray-700/50 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Backup #{backup.id}</span>
                  <span className="text-gray-400">
                    {new Date(backup.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleManualRecovery}
            disabled={recoveryState.status === 'recovering'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-md"
          >
            <RefreshCw className="w-4 h-4" />
            Trigger Recovery
          </button>
          <button
            onClick={handleCreateBackup}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            <Archive className="w-4 h-4" />
            Create Backup
          </button>
        </div>
      </div>
    </div>
  );
}