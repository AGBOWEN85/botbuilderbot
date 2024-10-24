import { useState, useEffect } from 'react';
import MonitoringService from '../services/monitoring';
import { MetricsData } from '../types/monitoring';

export function useMonitoring() {
  const [metrics, setMetrics] = useState<MetricsData>({
    systemHealth: {
      cpu: 0,
      memory: 0,
      network: 0,
      uptime: '0%'
    },
    performance: {
      responseTime: 0,
      throughput: 0,
      errorRate: 0,
      successRate: 0
    }
  });

  useEffect(() => {
    const monitoringService = MonitoringService.getInstance();
    
    const updateMetrics = () => {
      setMetrics(monitoringService.getAllMetrics());
    };

    // Initial update
    updateMetrics();

    // Set up periodic updates
    const interval = setInterval(updateMetrics, 3000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}