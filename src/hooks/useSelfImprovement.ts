import { useState, useEffect } from 'react';
import SelfImprovementService from '../services/selfImprovement';
import { 
  ImprovementMetrics, 
  SkillMatrix, 
  LearningPath, 
  ExperienceLog 
} from '../types/selfImprovement';

export function useSelfImprovement() {
  const [skillMatrix, setSkillMatrix] = useState<SkillMatrix>({
    technical: new Map(),
    cognitive: new Map(),
    adaptive: new Map()
  });
  const [metrics, setMetrics] = useState<Map<string, ImprovementMetrics>>(new Map());
  const [learningPaths, setLearningPaths] = useState<Map<string, LearningPath>>(new Map());
  const [experienceLogs, setExperienceLogs] = useState<ExperienceLog[]>([]);

  useEffect(() => {
    const selfImprovementService = SelfImprovementService.getInstance();
    
    const updateState = () => {
      setSkillMatrix(selfImprovementService.getSkillMatrix());
      setMetrics(selfImprovementService.getImprovementMetrics());
      setLearningPaths(selfImprovementService.getLearningPaths());
      setExperienceLogs(selfImprovementService.getExperienceLogs());
    };

    // Initial update
    updateState();

    // Set up periodic updates
    const interval = setInterval(updateState, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    skillMatrix,
    metrics,
    learningPaths,
    experienceLogs
  };
}