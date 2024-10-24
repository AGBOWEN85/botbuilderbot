import React from 'react';
import { Cpu, Activity, Zap, Binary } from 'lucide-react';
import { useQuantum } from '../hooks/useQuantum';

export default function QuantumPanel() {
  const { circuits, executeCircuit, isExecuting } = useQuantum();

  const handleExecute = async (circuitId: string) => {
    await executeCircuit(circuitId);
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Cpu className="w-5 h-5 text-purple-400" />
        Quantum Processing Units
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {circuits.map((circuit) => (
          <div key={circuit.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Binary className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-medium">
                  {circuit.qubits}-Qubit Circuit
                </h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                circuit.status === 'initialized' 
                  ? 'bg-blue-500/20 text-blue-400'
                  : circuit.status === 'running'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {circuit.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700/50 rounded p-2">
                  <div className="text-xs text-gray-400">Gates</div>
                  <div className="text-sm text-white">{circuit.gates.length}</div>
                </div>
                <div className="bg-gray-700/50 rounded p-2">
                  <div className="text-xs text-gray-400">Created</div>
                  <div className="text-sm text-white">
                    {new Date(circuit.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleExecute(circuit.id)}
                disabled={isExecuting || circuit.status === 'running'}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                         text-white rounded-md text-sm flex items-center justify-center gap-2"
              >
                {isExecuting ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Execute Circuit
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}