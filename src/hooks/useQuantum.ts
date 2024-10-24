import { useState, useEffect } from 'react';
import QuantumService from '../services/quantum';
import { QuantumCircuit, QuantumResult, QuantumConfig } from '../types/quantum';

export function useQuantum() {
  const [circuits, setCircuits] = useState<QuantumCircuit[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quantumService = QuantumService.getInstance();

  useEffect(() => {
    // Initialize quantum circuits
    createInitialCircuits();
  }, []);

  const createInitialCircuits = async () => {
    try {
      const configs: QuantumConfig[] = [
        { qubits: 4, algorithm: 'Shor', precision: 0.99, maxIterations: 1000 },
        { qubits: 8, algorithm: 'Grover', precision: 0.95, maxIterations: 500 }
      ];

      const newCircuits = await Promise.all(
        configs.map(config => quantumService.createQuantumCircuit(config))
      );

      setCircuits(newCircuits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize quantum circuits');
    }
  };

  const executeCircuit = async (circuitId: string): Promise<QuantumResult | null> => {
    setIsExecuting(true);
    setError(null);

    try {
      const result = await quantumService.executeQuantumAlgorithm(circuitId);
      setCircuits(prev => prev.map(circuit => 
        circuit.id === circuitId 
          ? { ...circuit, status: 'completed' }
          : circuit
      ));
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Circuit execution failed');
      return null;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    circuits,
    isExecuting,
    error,
    executeCircuit
  };
}