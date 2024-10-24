import React from 'react';
import { Brain, Activity, TrendingUp, BarChart2 } from 'lucide-react';
import { useOptimization } from '../hooks/useOptimization';
import { OptimizationModel } from '../types/optimization';

export default function OptimizationPanel() {
  const { models, solveGeneticAlgorithm, solveLinearProgram, isSolving } = useOptimization();

  const handleSolveGenetic = async () => {
    await solveGeneticAlgorithm({
      populationSize: 100,
      generations: 50,
      mutationRate: 0.01,
      crossoverRate: 0.8,
      fitnessFunction: (genes) => genes.reduce((sum, gene) => sum + gene, 0),
      targetFitness: 0.95
    });
  };

  const handleSolveLinear = async () => {
    await solveLinearProgram({
      solver: 'simplex',
      maxIterations: 1000,
      tolerance: 1e-6,
      variables: 10
    });
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        Optimization Models
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onSolve={model.type === 'genetic' ? handleSolveGenetic : handleSolveLinear}
            isSolving={isSolving}
          />
        ))}
      </div>
    </div>
  );
}

interface ModelCardProps {
  model: OptimizationModel;
  onSolve: () => void;
  isSolving: boolean;
}

function ModelCard({ model, onSolve, isSolving }: ModelCardProps) {
  const metrics = 'bestFitness' in model.metrics 
    ? model.metrics 
    : model.metrics;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          <h4 className="text-white font-medium capitalize">{model.type} Optimizer</h4>
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
        {'bestFitness' in metrics ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Best Fitness</span>
                <span className="text-white">{metrics.bestFitness.toFixed(4)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 rounded-full h-1.5"
                  style={{ width: `${metrics.bestFitness * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-xs text-gray-400">Generations</div>
                <div className="text-sm text-white">{metrics.generationCount}</div>
              </div>
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-xs text-gray-400">Convergence</div>
                <div className="text-sm text-white">
                  {(metrics.convergenceRate * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Objective Value</span>
                <span className="text-white">{metrics.objectiveValue.toFixed(4)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-xs text-gray-400">Iterations</div>
                <div className="text-sm text-white">{metrics.iterationCount}</div>
              </div>
              <div className="bg-gray-700/50 rounded p-2">
                <div className="text-xs text-gray-400">Solution Time</div>
                <div className="text-sm text-white">{metrics.solutionTime}ms</div>
              </div>
            </div>
          </>
        )}

        <button
          onClick={onSolve}
          disabled={isSolving || model.status !== 'ready'}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                     text-white rounded-md text-sm flex items-center justify-center gap-2"
        >
          {isSolving ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Solving...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4" />
              Start Optimization
            </>
          )}
        </button>
      </div>
    </div>
  );
}