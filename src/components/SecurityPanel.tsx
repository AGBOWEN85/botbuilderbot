import React from 'react';
import { Shield, Activity, AlertTriangle, Search } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';
import { SecurityModel } from '../types/security';

export default function SecurityPanel() {
  const { models, scanTarget, isScanning } = useSecurity();

  const handleScan = async (modelId: string) => {
    await scanTarget('example.com', {
      target: 'example.com',
      depth: 'comprehensive',
      realTime: true
    });
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-red-400" />
        Security Models
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <SecurityModelCard
            key={model.id}
            model={model}
            onScan={() => handleScan(model.id)}
            isScanning={isScanning}
          />
        ))}
      </div>
    </div>
  );
}

interface SecurityModelCardProps {
  model: SecurityModel;
  onScan: () => void;
  isScanning: boolean;
}

function SecurityModelCard({ model, onScan, isScanning }: SecurityModelCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h4 className="text-white font-medium capitalize">
            {model.type === 'vulnerability' ? 'Vulnerability Scanner' : 'Network Analyzer'}
          </h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          model.status === 'ready' 
            ? 'bg-green-500/20 text-green-400'
            : 'bg-blue-500/20 text-blue-400'
        }`}>
          {model.status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-400">Detection Rate</div>
            <div className="text-sm text-white">
              {(model.metrics.detectionRate * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-400">False Positives</div>
            <div className="text-sm text-white">
              {(model.metrics.falsePositives * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <button
          onClick={onScan}
          disabled={isScanning || model.status !== 'ready'}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                   text-white rounded-md text-sm flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Start Scan
            </>
          )}
        </button>
      </div>
    </div>
  );
}