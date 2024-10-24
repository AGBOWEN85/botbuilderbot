import React from 'react';
import { Cpu, TrendingUp } from 'lucide-react';
import { TrainingSession } from '../types/autonomy';

interface TrainingMetricsProps {
  sessions: TrainingSession[];
  onStartTraining: () => void;
}

export default function TrainingMetrics({ sessions, onStartTraining }: TrainingMetricsProps) {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Neural Training
        </h3>
        <button
          onClick={onStartTraining}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
        >
          Start Training
        </button>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Session {session.id}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                session.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400'
                  : session.status === 'active'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {session.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center">
                <div className="text-sm text-gray-400">Accuracy</div>
                <div className="text-white font-medium">
                  {Math.round(session.metrics.accuracy * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Efficiency</div>
                <div className="text-white font-medium">
                  {Math.round(session.metrics.efficiency * 100)}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Iterations</div>
                <div className="text-white font-medium">
                  {session.metrics.iterations}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}