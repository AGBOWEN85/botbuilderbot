import { ModelConfig, ModelType, ModelRegistry, ModelInstance } from '../types/models';

class ModelRegistryService {
  private static instance: ModelRegistryService;
  private registry: ModelRegistry = new Map();
  private activeModels: Map<string, ModelInstance> = new Map();

  private constructor() {
    this.initializeRegistry();
  }

  public static getInstance(): ModelRegistryService {
    if (!ModelRegistryService.instance) {
      ModelRegistryService.instance = new ModelRegistryService();
    }
    return ModelRegistryService.instance;
  }

  private async initializeRegistry(): Promise<void> {
    // Initialize base models
    await Promise.all([
      this.registerModel({
        id: 'gpt4-base',
        type: 'language',
        source: 'huggingface',
        config: {
          modelName: 'gpt4',
          maxLength: 2048,
          temperature: 0.7
        },
        metrics: {
          accuracy: 0.95,
          latency: 100,
          lastUpdated: new Date()
        }
      }),
      this.registerModel({
        id: 'bert-qa',
        type: 'questionAnswering',
        source: 'huggingface',
        config: {
          modelName: 'bert-large-uncased-whole-word-masking-finetuned-squad',
          maxLength: 512
        },
        metrics: {
          accuracy: 0.88,
          latency: 50,
          lastUpdated: new Date()
        }
      })
    ]);
  }

  public async registerModel(config: ModelConfig): Promise<void> {
    const model: ModelInstance = {
      ...config,
      status: 'initializing',
      performance: {
        accuracy: 0,
        latency: 0,
        requests: 0
      },
      lastUsed: new Date()
    };

    try {
      await this.validateModel(model);
      model.status = 'ready';
      this.registry.set(config.id, model);
    } catch (error) {
      model.status = 'error';
      throw new Error(`Failed to register model: ${error}`);
    }
  }

  private async validateModel(model: ModelInstance): Promise<void> {
    // Validate model compatibility and requirements
    const validationChecks = [
      this.checkModelCompatibility(model),
      this.checkResourceRequirements(model),
      this.checkSecurityCompliance(model)
    ];

    await Promise.all(validationChecks);
  }

  private async checkModelCompatibility(model: ModelInstance): Promise<void> {
    // Implement compatibility checks
  }

  private async checkResourceRequirements(model: ModelInstance): Promise<void> {
    // Implement resource requirement checks
  }

  private async checkSecurityCompliance(model: ModelInstance): Promise<void> {
    // Implement security compliance checks
  }

  public async getModel(type: ModelType, requirements: any): Promise<ModelInstance | null> {
    const candidates = Array.from(this.registry.values())
      .filter(model => model.type === type && model.status === 'ready');

    if (candidates.length === 0) return null;

    // Select best model based on requirements
    return this.selectBestModel(candidates, requirements);
  }

  private selectBestModel(candidates: ModelInstance[], requirements: any): ModelInstance {
    return candidates.reduce((best, current) => {
      const bestScore = this.calculateModelScore(best, requirements);
      const currentScore = this.calculateModelScore(current, requirements);
      return currentScore > bestScore ? current : best;
    });
  }

  private calculateModelScore(model: ModelInstance, requirements: any): number {
    // Implement scoring logic based on requirements
    let score = 0;
    
    // Weight accuracy
    score += model.metrics.accuracy * 0.4;
    
    // Weight latency (inverse relationship)
    score += (1 / model.metrics.latency) * 0.3;
    
    // Weight recency of updates
    const daysSinceUpdate = (Date.now() - model.metrics.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
    score += (1 / (daysSinceUpdate + 1)) * 0.3;
    
    return score;
  }

  public async updateModel(modelId: string, updates: Partial<ModelConfig>): Promise<void> {
    const model = this.registry.get(modelId);
    if (!model) throw new Error('Model not found');

    const updatedModel = {
      ...model,
      ...updates,
      metrics: {
        ...model.metrics,
        lastUpdated: new Date()
      }
    };

    await this.validateModel(updatedModel);
    this.registry.set(modelId, updatedModel);
  }

  public getRegisteredModels(): ModelInstance[] {
    return Array.from(this.registry.values());
  }
}

export default ModelRegistryService;