import React from 'react';
import { Bot, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { NLPModel } from '../types/nlp';

interface ModelCardProps {
  model: NLPModel;
}

export default function ModelCard({ model }: ModelCardProps) {
  const getStatusIcon = () => {
    switch (model.status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-400 animate-pulse" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h4 className="text-white font-medium capitalize">{model.type}</h4>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Variant</span>
          <span className="text-white">{model.variant}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Accuracy</span>
            <span className="text-white">{Math.round(model.metrics.accuracy * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-blue-500 rounded-full h-1.5"
              style={{ width: `${model.metrics.accuracy * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Latency</span>
          <span className="text-white">{model.metrics.latency.toFixed(1)}ms</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Requests</span>
          <span className="text-white">{model.metrics.requestCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}