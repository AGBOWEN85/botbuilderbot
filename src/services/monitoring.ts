import { MetricsData, SystemHealth, PerformanceMetrics } from '../types/monitoring';

class MonitoringService {
  private static instance: MonitoringService;
  private metrics: MetricsData = {
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
  };

  private constructor() {
    this.initializeMonitoring();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private initializeMonitoring(): void {
    // Initialize system monitoring
    this.monitorSystemHealth();
    this.monitorPerformance();
  }

  private monitorSystemHealth(): void {
    setInterval(() => {
      // Simulate real system metrics collection
      this.metrics.systemHealth = {
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: +(Math.random() * 2 + 2).toFixed(1),
        network: Math.floor(Math.random() * 20) + 80,
        uptime: '99.99%'
      };
    }, 5000);
  }

  private monitorPerformance(): void {
    setInterval(() => {
      // Simulate performance metrics collection
      this.metrics.performance = {
        responseTime: Math.floor(Math.random() * 50) + 20,
        throughput: Math.floor(Math.random() * 1000) + 500,
        errorRate: +(Math.random() * 0.5).toFixed(2),
        successRate: +(99.5 + Math.random() * 0.5).toFixed(2)
      };
    }, 3000);
  }

  public getSystemHealth(): SystemHealth {
    return this.metrics.systemHealth;
  }

  public getPerformanceMetrics(): PerformanceMetrics {
    return this.metrics.performance;
  }

  public getAllMetrics(): MetricsData {
    return this.metrics;
  }
}

export default MonitoringService;