export type ModelType = 'conversation' | 'sentiment' | 'summarization';

export interface NLPModel {
  id: string;
  type: ModelType;
  variant: string;
  status: 'loading' | 'ready' | 'error';
  metrics: {
    accuracy: number;
    latency: number;
    requestCount: number;
  };
  lastUpdated: Date;
}

export interface NLPConfig {
  maxLength?: number;
  temperature?: number;
  language?: string;
  context?: Record<string, any>;
}

export interface NLPResult {
  type: ModelType;
  output: any;
  metadata: {
    processingTime: number;
    modelVersion: string;
    timestamp: Date;
  };
}

export interface ConversationOutput {
  response: string;
  confidence: number;
  context?: Record<string, any>;
}

export interface SentimentOutput {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  aspects: Array<{
    term: string;
    sentiment: string;
    score: number;
  }>;
}

export interface SummarizationOutput {
  summary: string;
  compressionRatio: number;
  keyPoints: string[];
}