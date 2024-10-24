import { useState } from 'react';
import EthicsService from '../services/ethics';
import { ComplianceResult } from '../types/ethics';

export function useEthics() {
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<ComplianceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ethicsService = EthicsService.getInstance();

  const checkCompliance = async (botConfig: any) => {
    setIsChecking(true);
    setError(null);

    try {
      const result = await ethicsService.checkCompliance(botConfig);
      setLastCheck(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check compliance');
      return null;
    } finally {
      setIsChecking(false);
    }
  };

  return {
    checkCompliance,
    isChecking,
    lastCheck,
    error
  };
}