import React from 'react';
import { Brain, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { RLModel } from '../types/reinforcementLearning';
import { useRL } from '../hooks/useRL';

export default function ReinforcementLearningPanel() {
  const { models, startTraining, isTraining } = useRL();

  const handleStartTraining = async (modelId: string) => {
    await startTraining(modelId, {
      maxSteps: 1000,
      targetReward: 100
    });
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        Reinforcement Learning Models
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onStartTraining={() => handleStartTraining(model.id)}
            isTraining={isTraining}
          />
        ))}
      </div>
    </div>
  );
}

interface ModelCardProps {
  model: RLModel;
  onStartTraining: () => void;
  isTraining: boolean;
}

function ModelCard({ model, onStartTraining, isTraining }: ModelCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h4 className="text-white font-medium capitalize">{model.type}</h4>
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
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Average Reward</span>
            <span className="text-white">{model.metrics.averageReward.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-blue-500 rounded-full h-1.5"
              style={{ width: `${(model.metrics.averageReward / 100) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-400">Success Rate</div>
            <div className="text-sm text-white">
              {(model.metrics.successRate * 100).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-xs text-gray-400">Convergence</div>
            <div className="text-sm text-white">
              {(model.metrics.convergenceRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <button
          onClick={onStartTraining}
          disabled={isTraining || model.status !== 'ready'}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                     text-white rounded-md text-sm flex items-center justify-center gap-2"
        >
          {isTraining ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Training...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4" />
              Start Training
            </>
          )}
        </button>
      </div>
    </div>
  );
}