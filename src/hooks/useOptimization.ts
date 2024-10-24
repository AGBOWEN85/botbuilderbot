import { useState } from 'react';
import OptimizationService from '../services/optimization';
import { 
  OptimizationModel,
  GeneticConfig,
  LinearProgramConfig,
  OptimizationResult 
} from '../types/optimization';

export function useOptimization() {
  const [models, setModels] = useState<OptimizationModel[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optimizationService = OptimizationService.getInstance();

  const solveGeneticAlgorithm = async (config: GeneticConfig): Promise<OptimizationResult | null> => {
    setIsSolving(true);
    setError(null);

    try {
      const result = await optimizationService.solveGeneticAlgorithm(config);
      setModels(optimizationService.getModels());
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to solve genetic algorithm');
      return null;
    } finally {
      setIsSolving(false);
    }
  };

  const solveLinearProgram = async (config: LinearProgramConfig): Promise<OptimizationResult | null> => {
    setIsSolving(true);
    setError(null);

    try {
      const result = await optimizationService.solveLinearProgram(config);
      setModels(optimizationService.getModels());
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to solve linear program');
      return null;
    } finally {
      setIsSolving(false);
    }
  };

  return {
    models,
    isSolving,
    error,
    solveGeneticAlgorithm,
    solveLinearProgram
  };
}