export interface OptimizationModel {
  id: string;
  type: 'genetic' | 'linear';
  status: 'initializing' | 'ready' | 'solving' | 'error';
  config: GeneticConfig | LinearProgramConfig;
  metrics: GeneticMetrics | LinearProgramMetrics;
}

export interface GeneticConfig {
  populationSize: number;
  generations: number;
  mutationRate: number;
  crossoverRate: number;
  fitnessFunction?: (genes: number[]) => number;
  targetFitness?: number;
}

export interface LinearProgramConfig {
  solver: 'simplex' | 'interior-point';
  maxIterations: number;
  tolerance: number;
  variables: number;
  constraints?: {
    coefficients: number[][];
    bounds: number[];
  };
}

export interface GeneticMetrics {
  bestFitness: number;
  averageFitness: number;
  generationCount: number;
  convergenceRate: number;
}

export interface LinearProgramMetrics {
  objectiveValue: number;
  iterationCount: number;
  solutionTime: number;
  feasibility: boolean;
}

export interface OptimizationResult {
  solution: number[];
  fitness?: number;
  objectiveValue?: number;
  generations?: number;
  iterations?: number;
  convergence?: boolean;
  solutionTime?: number;
}

export interface Individual {
  genes: number[];
  fitness: number;
}

export interface Population {
  individuals: Individual[];
}