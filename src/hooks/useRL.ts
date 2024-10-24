import { useState, useEffect } from 'react';
import ReinforcementLearningService from '../services/reinforcementLearning';
import { RLModel, RLConfig, RLResult } from '../types/reinforcementLearning';

export function useRL() {
  const [models, setModels] = useState<RLModel[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rlService = ReinforcementLearningService.getInstance();

  useEffect(() => {
    setModels(rlService.getModels());
  }, []);

  const startTraining = async (modelId: string, config: RLConfig): Promise<RLResult | null> => {
    setIsTraining(true);
    setError(null);

    try {
      const result = await rlService.trainModel(modelId, config);
      setModels(rlService.getModels()); // Refresh models after training
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Training failed');
      return null;
    } finally {
      setIsTraining(false);
    }
  };

  return {
    models,
    isTraining,
    error,
    startTraining
  };
}