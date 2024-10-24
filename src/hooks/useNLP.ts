import { useState } from 'react';
import NLPService from '../services/nlp';
import { ModelType, NLPConfig, NLPResult, NLPModel } from '../types/nlp';

export function useNLP() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<NLPModel[]>([]);

  const nlpService = NLPService.getInstance();

  const processText = async (
    text: string,
    modelType: ModelType,
    config?: NLPConfig
  ): Promise<NLPResult | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await nlpService.processText(text, modelType, config);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const refreshModels = () => {
    setModels(nlpService.getAllModels());
  };

  return {
    processText,
    refreshModels,
    models,
    isProcessing,
    error
  };
}