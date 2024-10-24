import { useState } from 'react';
import SecurityService from '../services/security';
import { SecurityModel, SecurityConfig, VulnerabilityReport } from '../types/security';

export function useSecurity() {
  const [models, setModels] = useState<SecurityModel[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const securityService = SecurityService.getInstance();

  const scanTarget = async (target: string, config: SecurityConfig): Promise<VulnerabilityReport | null> => {
    setIsScanning(true);
    setError(null);

    try {
      const report = await securityService.scanForVulnerabilities(target, config);
      setModels(securityService.getModels());
      return report;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Security scan failed');
      return null;
    } finally {
      setIsScanning(false);
    }
  };

  return {
    models,
    isScanning,
    error,
    scanTarget
  };
}