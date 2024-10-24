export interface SecurityModel {
  id: string;
  type: 'vulnerability' | 'network';
  status: 'initializing' | 'ready' | 'scanning' | 'error';
  config: {
    scanDepth?: 'basic' | 'comprehensive';
    realTime?: boolean;
    threshold?: number;
    packetInspection?: 'shallow' | 'deep';
    anomalyDetection?: boolean;
  };
  metrics: {
    detectionRate: number;
    falsePositives: number;
    scanTime: number;
  };
}

export interface SecurityConfig {
  target: string;
  depth: 'basic' | 'comprehensive';
  realTime: boolean;
  customRules?: string[];
}

export interface SecurityResult {
  modelId: string;
  timestamp: Date;
  findings: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    details: any;
  }>;
  metrics: {
    scanDuration: number;
    confidence: number;
  };
}

export interface VulnerabilityReport {
  target: string;
  timestamp: Date;
  vulnerabilities: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  }>;
  scanDuration: number;
  riskScore: number;
}