export interface SystemHealth {
  cpu: number;
  memory: number;
  network: number;
  uptime: string;
}

export interface PerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  successRate: number;
}

export interface MetricsData {
  systemHealth: SystemHealth;
  performance: PerformanceMetrics;
}

export interface MonitoringConfig {
  interval: number;
  enableLogging: boolean;
  alertThresholds: {
    cpu: number;
    memory: number;
    errorRate: number;
  };
}