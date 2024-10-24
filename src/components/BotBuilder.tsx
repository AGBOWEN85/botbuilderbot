import React from 'react';
import { Brain, Cpu, Bot, Mic, Volume2, Waveform } from 'lucide-react';
import { useAutonomy } from '../hooks/useAutonomy';
import { useSelfImprovement } from '../hooks/useSelfImprovement';
import { useNLP } from '../hooks/useNLP';
import ModelCard from './ModelCard';
import TrainingMetrics from './TrainingMetrics';
import AudioModelPanel from './AudioModelPanel';
import QuantumPanel from './QuantumPanel';

export default function BotBuilder() {
  const { trainingSessions, startTraining } = useAutonomy();
  const { skillMatrix, metrics } = useSelfImprovement();
  const { models } = useNLP();

  const handleStartTraining = async () => {
    await startTraining();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          Advanced Bot Builder Console
        </h2>

        {/* Training Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TrainingMetrics 
            sessions={trainingSessions}
            onStartTraining={handleStartTraining}
          />

          {/* Skill Matrix */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-yellow-400" />
              Neural Network Skills
            </h3>
            <div className="space-y-2">
              {Array.from(skillMatrix.technical.entries()).map(([skill, data]) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-gray-300">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${data.level * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">
                      {Math.round(data.level * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantum Computing Panel */}
        <QuantumPanel />

        {/* Audio Models */}
        <AudioModelPanel />

        {/* Active Models Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
}