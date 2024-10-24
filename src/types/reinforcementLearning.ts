export interface RLModel {
  id: string;
  type: 'q-learning' | 'ppo';
  status: 'initializing' | 'ready' | 'training' | 'error';
  config: {
    learningRate: number;
    discountFactor?: number;
    explorationRate?: number;
    clipRange?: number;
    epochsPerIteration?: number;
    miniBatchSize?: number;
  };
  metrics: {
    episodeRewards: number[];
    averageReward: number;
    convergenceRate: number;
    successRate: number;
  };
  lastUpdated: Date;
}

export interface RLConfig {
  maxSteps?: number;
  targetReward?: number;
  environmentConfig?: Record<string, any>;
  customRewards?: Record<string, number>;
}

export interface RLResult {
  episodeId: string;
  totalReward: number;
  steps: number;
  executionTime: number;
  convergence: number;
}

export interface ModelState {
  observation: number[];
  action: number;
  reward: number;
  nextObservation: number[];
  done: boolean;
}

export interface Episode {
  id: string;
  modelId: string;
  startTime: Date;
  endTime?: Date;
  steps: Array<{
    action: string;
    reward: number;
    timestamp: Date;
  }>;
  reward: number;
  status: 'in_progress' | 'completed' | 'failed';
}