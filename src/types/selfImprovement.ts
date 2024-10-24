export interface ImprovementMetrics {
  timestamp: Date;
  category: string;
  measurements: {
    efficiency: number;
    accuracy: number;
    responseTime: number;
  };
  insights: string[];
}

export interface LearningPath {
  id: string;
  skillName: string;
  status: 'ready' | 'in_progress' | 'completed';
  steps: string[];
  expectedImprovement: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface SkillData {
  level: number;
  experience: number;
  lastImprovement: Date;
}

export interface SkillMatrix {
  technical: Map<string, SkillData>;
  cognitive: Map<string, SkillData>;
  adaptive: Map<string, SkillData>;
}

export interface ExperienceLog {
  timestamp: Date;
  type: 'skill_improvement' | 'error_recovery' | 'performance_optimization';
  details: Record<string, any>;
  impact: number;
}

export interface ImprovementStrategy {
  type: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
  expectedImprovement: number;
}