export interface LearningMetrics {
  timestamp: Date;
  success: boolean;
  impact: number;
  confidence: number;
}

export interface DecisionNode {
  id: string;
  condition?: string;
  threshold?: number;
  trueNode?: string;
  falseNode?: string;
  action?: string;
  parameters?: Record<string, any>;
  confidence?: number;
}

export interface TrainingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'paused' | 'completed';
  metrics: {
    accuracy: number;
    efficiency: number;
    iterations: number;
  };
  improvements: Array<{
    timestamp: Date;
    metric: string;
    improvement: number;
  }>;
}