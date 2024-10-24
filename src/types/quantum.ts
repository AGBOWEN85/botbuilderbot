export interface QuantumCircuit {
  id: string;
  qubits: number;
  gates: QuantumGate[];
  createdAt: Date;
  status: 'initialized' | 'running' | 'completed' | 'error';
}

export interface QuantumGate {
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT';
  targets: number[];
  controls?: number[];
  angle?: number;
}

export interface QuantumResult {
  circuitId: string;
  results: Float64Array;
  executionTime: number;
  errorRate: number;
  timestamp: Date;
}

export interface QuantumConfig {
  qubits: number;
  algorithm: 'Shor' | 'Grover' | 'VQE';
  precision: number;
  maxIterations: number;
}