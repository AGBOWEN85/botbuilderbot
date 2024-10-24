import { useState, useEffect } from 'react';
import AutonomyService from '../services/autonomy';
import { TrainingSession, LearningMetrics } from '../types/autonomy';

export function useAutonomy() {
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [learningMetrics, setLearningMetrics] = useState<Map<string, LearningMetrics>>(new Map());
  const [isTraining, setIsTraining] = useState(false);

  const autonomyService = AutonomyService.getInstance();

  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingSessions(autonomyService.getTrainingProgress());
      setLearningMetrics(autonomyService.getLearningMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startTraining = async () => {
    setIsTraining(true);
    try {
      const session = await autonomyService.startTrainingSession();
      setTrainingSessions(prev => [...prev, session]);
      return session;
    } finally {
      setIsTraining(false);
    }
  };

  const makeDecision = async (context: any) => {
    return await autonomyService.makeAutonomousDecision(context);
  };

  const evaluateBot = async (bot: any) => {
    return await autonomyService.evaluateBot(bot);
  };

  return {
    trainingSessions,
    learningMetrics,
    isTraining,
    startTraining,
    makeDecision,
    evaluateBot
  };
}