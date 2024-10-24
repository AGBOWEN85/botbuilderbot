import React from 'react';
import { Rocket, GitMerge, Shield, RefreshCw } from 'lucide-react';

interface DeploymentSettingsProps {
  autoUpdate: boolean;
  onAutoUpdateChange: (enabled: boolean) => void;
  deploymentEnvironment: string;
  onEnvironmentChange: (env: string) => void;
}

export default function DeploymentSettings({
  autoUpdate,
  onAutoUpdateChange,
  deploymentEnvironment,
  onEnvironmentChange,
}: DeploymentSettingsProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-blue-400" />
        Deployment Settings
      </h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="text-white font-medium">Auto Updates</h4>
              <p className="text-gray-400 text-sm">
                Automatically deploy verified improvements
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoUpdate}
              onChange={(e) => onAutoUpdateChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div className="p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <GitMerge className="w-5 h-5 text-green-400" />
            <h4 className="text-white font-medium">Deployment Environment</h4>
          </div>
          <select
            value={deploymentEnvironment}
            onChange={(e) => onEnvironmentChange(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 rounded-md text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
          <Shield className="w-5 h-5 text-yellow-400" />
          <div>
            <h4 className="text-white font-medium">Security Checks</h4>
            <p className="text-gray-400 text-sm">
              All deployments undergo automated security scanning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}