export type ModelType = 
  | 'language'
  | 'vision'
  | 'audio'
  | 'questionAnswering'
  | 'reinforcementLearning'
  | 'optimization';

export type ModelSource = 'huggingface' | 'github' | 'custom';

export type ModelStatus = 'initializing' | 'ready' | 'error' | 'updating';

export interface ModelConfig {
  id: string;
  type: ModelType;
  source: ModelSource;
  config: Record<string, any>;
  metrics: {
    accuracy: number;
    latency: number;
    lastUpdated: Date;
  };
}

export interface ModelInstance extends ModelConfig {
  status: ModelStatus;
  performance: {
    accuracy: number;
    latency: number;
    requests: number;
  };
  lastUsed: Date;
}

export type ModelRegistry = Map<string, ModelInstance>;

export interface ModelUpdateEvent {
  modelId: string;
  type: 'update' | 'error' | 'performance';
  data: any;
  timestamp: Date;
}