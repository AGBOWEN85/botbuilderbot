import { 
  OptimizationModel, 
  GeneticConfig, 
  LinearProgramConfig,
  OptimizationResult,
  Population,
  Individual
} from '../types/optimization';

class OptimizationService {
  private static instance: OptimizationService;
  private models: Map<string, OptimizationModel> = new Map();
  private populations: Map<string, Population> = new Map();

  private constructor() {
    this.initializeOptimizers();
  }

  public static getInstance(): OptimizationService {
    if (!OptimizationService.instance) {
      OptimizationService.instance = new OptimizationService();
    }
    return OptimizationService.instance;
  }

  private async initializeOptimizers(): Promise<void> {
    await Promise.all([
      this.initializeGeneticAlgorithm(),
      this.initializeLinearProgramming()
    ]);
  }

  private async initializeGeneticAlgorithm(): Promise<void> {
    const geneticModel: OptimizationModel = {
      id: 'genetic-algorithm',
      type: 'genetic',
      status: 'ready',
      config: {
        populationSize: 100,
        generations: 50,
        mutationRate: 0.01,
        crossoverRate: 0.8
      },
      metrics: {
        bestFitness: 0,
        averageFitness: 0,
        generationCount: 0,
        convergenceRate: 0
      }
    };
    this.models.set(geneticModel.id, geneticModel);
  }

  private async initializeLinearProgramming(): Promise<void> {
    const lpModel: OptimizationModel = {
      id: 'linear-programming',
      type: 'linear',
      status: 'ready',
      config: {
        solver: 'simplex',
        maxIterations: 1000,
        tolerance: 1e-6
      },
      metrics: {
        objectiveValue: 0,
        iterationCount: 0,
        solutionTime: 0,
        feasibility: true
      }
    };
    this.models.set(lpModel.id, lpModel);
  }

  public async solveGeneticAlgorithm(config: GeneticConfig): Promise<OptimizationResult> {
    const model = this.models.get('genetic-algorithm');
    if (!model) throw new Error('Genetic algorithm model not initialized');

    const population = this.initializePopulation(config.populationSize);
    let generation = 0;
    let bestSolution: Individual | null = null;

    while (generation < config.generations) {
      const evaluated = await this.evaluatePopulation(population, config.fitnessFunction);
      bestSolution = this.findBestSolution(evaluated);
      
      if (this.checkConvergence(bestSolution, config.targetFitness)) {
        break;
      }

      population.individuals = this.evolvePopulation(evaluated, config);
      generation++;
    }

    return {
      solution: bestSolution!.genes,
      fitness: bestSolution!.fitness,
      generations: generation,
      convergence: true
    };
  }

  public async solveLinearProgram(config: LinearProgramConfig): Promise<OptimizationResult> {
    const model = this.models.get('linear-programming');
    if (!model) throw new Error('Linear programming model not initialized');

    const startTime = Date.now();
    
    try {
      // Simulate solving linear programming problem
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const solution = this.simulateLinearProgramming(config);
      const endTime = Date.now();

      model.metrics.objectiveValue = solution.objectiveValue;
      model.metrics.iterationCount += 1;
      model.metrics.solutionTime = endTime - startTime;
      model.metrics.feasibility = true;

      return {
        solution: solution.variables,
        objectiveValue: solution.objectiveValue,
        iterations: model.metrics.iterationCount,
        solutionTime: model.metrics.solutionTime
      };
    } catch (error) {
      model.metrics.feasibility = false;
      throw error;
    }
  }

  private initializePopulation(size: number): Population {
    return {
      individuals: Array.from({ length: size }, () => ({
        genes: Array.from({ length: 10 }, () => Math.random()),
        fitness: 0
      }))
    };
  }

  private async evaluatePopulation(
    population: Population,
    fitnessFunction: (genes: number[]) => number
  ): Promise<Individual[]> {
    return Promise.all(
      population.individuals.map(async individual => ({
        ...individual,
        fitness: fitnessFunction(individual.genes)
      }))
    );
  }

  private findBestSolution(population: Individual[]): Individual {
    return population.reduce((best, current) => 
      current.fitness > best.fitness ? current : best
    );
  }

  private checkConvergence(solution: Individual | null, targetFitness: number): boolean {
    if (!solution) return false;
    return solution.fitness >= targetFitness;
  }

  private evolvePopulation(
    population: Individual[],
    config: GeneticConfig
  ): Individual[] {
    const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
    const elites = sorted.slice(0, Math.floor(population.length * 0.1));
    const newPopulation: Individual[] = [...elites];

    while (newPopulation.length < population.length) {
      const parent1 = this.selectParent(sorted);
      const parent2 = this.selectParent(sorted);
      const child = this.crossover(parent1, parent2, config.crossoverRate);
      this.mutate(child, config.mutationRate);
      newPopulation.push(child);
    }

    return newPopulation;
  }

  private selectParent(population: Individual[]): Individual {
    // Tournament selection
    const tournamentSize = 3;
    const tournament = Array.from({ length: tournamentSize }, () => 
      population[Math.floor(Math.random() * population.length)]
    );
    return this.findBestSolution(tournament);
  }

  private crossover(parent1: Individual, parent2: Individual, rate: number): Individual {
    if (Math.random() > rate) {
      return { ...parent1 };
    }

    const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
    const childGenes = [
      ...parent1.genes.slice(0, crossoverPoint),
      ...parent2.genes.slice(crossoverPoint)
    ];

    return {
      genes: childGenes,
      fitness: 0
    };
  }

  private mutate(individual: Individual, rate: number): void {
    individual.genes = individual.genes.map(gene => 
      Math.random() < rate ? Math.random() : gene
    );
  }

  private simulateLinearProgramming(config: LinearProgramConfig): {
    variables: number[];
    objectiveValue: number;
  } {
    // Simulate solving a linear programming problem
    const variables = Array.from(
      { length: config.variables },
      () => Math.random() * 10
    );
    
    const objectiveValue = variables.reduce((sum, v) => sum + v, 0);
    
    return {
      variables,
      objectiveValue
    };
  }

  public getModel(id: string): OptimizationModel | undefined {
    return this.models.get(id);
  }

  public getModels(): OptimizationModel[] {
    return Array.from(this.models.values());
  }
}

export default OptimizationService;