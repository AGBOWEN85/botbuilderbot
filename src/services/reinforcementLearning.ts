import { RLModel, RLConfig, RLResult, ModelState, Episode } from '../types/reinforcementLearning';

class ReinforcementLearningService {
  private static instance: ReinforcementLearningService;
  private models: Map<string, RLModel> = new Map();
  private episodes: Episode[] = [];
  private currentState: ModelState | null = null;

  private constructor() {
    this.initializeModels();
  }

  public static getInstance(): ReinforcementLearningService {
    if (!ReinforcementLearningService.instance) {
      ReinforcementLearningService.instance = new ReinforcementLearningService();
    }
    return ReinforcementLearningService.instance;
  }

  private async initializeModels(): Promise<void> {
    await Promise.all([
      this.initializeQLearning(),
      this.initializePPO()
    ]);
  }

  private async initializeQLearning(): Promise<void> {
    const qLearning: RLModel = {
      id: 'q-learning',
      type: 'q-learning',
      status: 'ready',
      config: {
        learningRate: 0.1,
        discountFactor: 0.95,
        explorationRate: 0.1
      },
      metrics: {
        episodeRewards: [],
        averageReward: 0,
        convergenceRate: 0,
        successRate: 0
      },
      lastUpdated: new Date()
    };
    this.models.set(qLearning.id, qLearning);
  }

  private async initializePPO(): Promise<void> {
    const ppo: RLModel = {
      id: 'ppo',
      type: 'ppo',
      status: 'ready',
      config: {
        learningRate: 0.0003,
        clipRange: 0.2,
        epochsPerIteration: 10,
        miniBatchSize: 64
      },
      metrics: {
        episodeRewards: [],
        averageReward: 0,
        convergenceRate: 0,
        successRate: 0
      },
      lastUpdated: new Date()
    };
    this.models.set(ppo.id, ppo);
  }

  public async trainModel(modelId: string, config: RLConfig): Promise<RLResult> {
    const model = this.models.get(modelId);
    if (!model) throw new Error('Model not found');

    const startTime = Date.now();
    const episode: Episode = {
      id: Math.random().toString(36).substr(2, 9),
      modelId,
      startTime: new Date(),
      steps: [],
      reward: 0,
      status: 'in_progress'
    };

    try {
      const result = await this.executeTraining(model, episode, config);
      this.updateModelMetrics(model, result);
      return result;
    } catch (error) {
      episode.status = 'failed';
      throw error;
    } finally {
      episode.endTime = new Date();
      this.episodes.push(episode);
    }
  }

  private async executeTraining(
    model: RLModel,
    episode: Episode,
    config: RLConfig
  ): Promise<RLResult> {
    const steps = config.maxSteps || 1000;
    let totalReward = 0;

    for (let i = 0; i < steps; i++) {
      const action = this.selectAction(model);
      const reward = await this.executeAction(action);
      totalReward += reward;

      episode.steps.push({
        action,
        reward,
        timestamp: new Date()
      });
    }

    episode.reward = totalReward;
    episode.status = 'completed';

    return {
      episodeId: episode.id,
      totalReward,
      steps: episode.steps.length,
      executionTime: Date.now() - episode.startTime.getTime(),
      convergence: this.calculateConvergence(episode)
    };
  }

  private selectAction(model: RLModel): string {
    if (model.type === 'q-learning') {
      return this.selectQLearningAction(model);
    } else {
      return this.selectPPOAction(model);
    }
  }

  private selectQLearningAction(model: RLModel): string {
    // Epsilon-greedy action selection
    if (Math.random() < model.config.explorationRate) {
      return 'explore';
    }
    return 'exploit';
  }

  private selectPPOAction(model: RLModel): string {
    // PPO action selection based on current policy
    return Math.random() > 0.5 ? 'action_a' : 'action_b';
  }

  private async executeAction(action: string): Promise<number> {
    // Simulate action execution and reward calculation
    await new Promise(resolve => setTimeout(resolve, 100));
    return Math.random();
  }

  private calculateConvergence(episode: Episode): number {
    const recentRewards = episode.steps
      .slice(-100)
      .map(step => step.reward);
    
    const mean = recentRewards.reduce((a, b) => a + b, 0) / recentRewards.length;
    const variance = recentRewards.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / recentRewards.length;
    
    return 1 / (1 + variance);
  }

  private updateModelMetrics(model: RLModel, result: RLResult): void {
    model.metrics.episodeRewards.push(result.totalReward);
    if (model.metrics.episodeRewards.length > 100) {
      model.metrics.episodeRewards.shift();
    }

    model.metrics.averageReward = model.metrics.episodeRewards.reduce((a, b) => a + b, 0) / 
      model.metrics.episodeRewards.length;
    model.metrics.convergenceRate = result.convergence;
    model.metrics.successRate = this.calculateSuccessRate(model);
    model.lastUpdated = new Date();
  }

  private calculateSuccessRate(model: RLModel): number {
    const recentEpisodes = this.episodes
      .filter(ep => ep.modelId === model.id)
      .slice(-100);

    return recentEpisodes.filter(ep => ep.status === 'completed').length / recentEpisodes.length;
  }

  public getModels(): RLModel[] {
    return Array.from(this.models.values());
  }

  public getEpisodes(modelId: string): Episode[] {
    return this.episodes.filter(ep => ep.modelId === modelId);
  }
}

export default ReinforcementLearningService;