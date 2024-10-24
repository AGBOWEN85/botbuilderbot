export interface EthicsConfig {
  dataPrivacy: {
    gdprCompliant: boolean;
    dataRetentionDays: number;
    encryptionRequired: boolean;
  };
  aiGuidelines: {
    preventBias: boolean;
    fairnessChecks: boolean;
    transparencyLevel: 'low' | 'medium' | 'high';
  };
  securityChecks: {
    vulnerabilityScan: boolean;
    penetrationTesting: boolean;
    codeReview: boolean;
  };
}

export interface EthicsCheck {
  type: 'privacy' | 'ai_guidelines' | 'security';
  passed: boolean;
  message: string;
  recommendation: string | null;
}

export interface ComplianceResult {
  passed: boolean;
  checks: EthicsCheck[];
  timestamp: Date;
  recommendations: string[];
}