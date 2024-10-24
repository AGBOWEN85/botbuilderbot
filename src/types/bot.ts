export interface CloudIntegration {
  provider: 'AWS' | 'Google Cloud' | 'IBM';
  services: string[];
  dataSource: string;
  learningRate?: number;
}

export interface Version {
  id: string;
  version: string;
  timestamp: Date;
  changes: string[];
  status: 'deployed' | 'pending' | 'failed' | 'rolled-back';
  metrics?: {
    performance: number;
    reliability: number;
    accuracy: number;
  };
}

export interface Bot {
  id: string;
  name: string;
  primaryFunction: string;
  baseModel: string;
  environment: string;
  cloudIntegrations: CloudIntegration[];
  config: Record<string, unknown>;
  status: 'initializing' | 'training' | 'active' | 'error';
  createdAt: Date;
  currentVersion: string;
  versions: Version[];
  lastDeployment?: Date;
  autoUpdate: boolean;
  template?: BotTemplate;
  industry?: string;
  customization?: BotCustomization;
}

export interface BotTemplate {
  id: string;
  name: string;
  description: string;
  type: 'nlp' | 'vision' | 'recommendation' | 'security' | 'analytics';
  baseConfig: Record<string, unknown>;
  requirements: string[];
  features: string[];
}

export interface BotCustomization {
  priority: 'speed' | 'accuracy' | 'efficiency';
  securityLevel: 'standard' | 'enhanced' | 'maximum';
  scalability: 'low' | 'medium' | 'high';
  userExperience: 'basic' | 'advanced' | 'expert';
}

export interface BotCreationData {
  name: string;
  primaryFunction: string;
  baseModel: string;
  environment: string;
  cloudIntegrations: CloudIntegration[];
  config: string;
  autoUpdate?: boolean;
  template?: string;
  industry?: string;
  customization?: BotCustomization;
}