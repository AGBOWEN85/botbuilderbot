import React from 'react';
import { GitBranch, GitCommit, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { Version } from '../types/bot';

interface VersionControlProps {
  versions: Version[];
  currentVersion: string;
  onRollback: (versionId: string) => void;
}

export default function VersionControl({ versions, currentVersion, onRollback }: VersionControlProps) {
  const getStatusIcon = (status: Version['status']) => {
    switch (status) {
      case 'deployed':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'rolled-back':
        return <RotateCcw className="w-4 h-4 text-yellow-400" />;
      default:
        return <GitCommit className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-blue-400" />
        Version History
      </h3>

      <div className="space-y-4">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`bg-gray-700/50 rounded-lg p-4 ${
              version.version === currentVersion ? 'border border-blue-500/50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(version.status)}
                <span className="text-white font-medium">v{version.version}</span>
                {version.version === currentVersion && (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                    Current
                  </span>
                )}
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(version.timestamp).toLocaleString()}
              </span>
            </div>

            <ul className="mt-2 space-y-1">
              {version.changes.map((change, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  {change}
                </li>
              ))}
            </ul>

            {version.metrics && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-gray-400 text-xs">Performance</div>
                  <div className="text-white font-medium">
                    {version.metrics.performance}%
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-gray-400 text-xs">Reliability</div>
                  <div className="text-white font-medium">
                    {version.metrics.reliability}%
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-700 rounded">
                  <div className="text-gray-400 text-xs">Accuracy</div>
                  <div className="text-white font-medium">
                    {version.metrics.accuracy}%
                  </div>
                </div>
              </div>
            )}

            {version.version !== currentVersion && version.status === 'deployed' && (
              <button
                onClick={() => onRollback(version.id)}
                className="mt-3 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                Rollback to this version
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}