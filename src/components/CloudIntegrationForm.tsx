import React from 'react';
import { Cloud, Database, Brain } from 'lucide-react';
import { CloudIntegration } from '../types/bot';

interface CloudIntegrationFormProps {
  integrations: CloudIntegration[];
  onChange: (integrations: CloudIntegration[]) => void;
}

export default function CloudIntegrationForm({ integrations, onChange }: CloudIntegrationFormProps) {
  const availableServices = {
    'AWS': ['SageMaker', 'Comprehend', 'Rekognition', 'Lambda'],
    'Google Cloud': ['Vertex AI', 'Natural Language', 'Vision AI', 'AutoML'],
    'IBM': ['Watson Studio', 'Watson NLP', 'Watson Vision', 'AutoAI']
  };

  const handleIntegrationChange = (index: number, field: keyof CloudIntegration, value: any) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index] = {
      ...updatedIntegrations[index],
      [field]: field === 'services' ? Array.from(value) : value
    };
    onChange(updatedIntegrations);
  };

  const addIntegration = () => {
    onChange([
      ...integrations,
      {
        provider: 'AWS',
        services: [],
        dataSource: 'training',
        learningRate: 0.001
      }
    ]);
  };

  const removeIntegration = (index: number) => {
    onChange(integrations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-400" />
          Cloud Integrations
        </h3>
        <button
          type="button"
          onClick={addIntegration}
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Add Integration
        </button>
      </div>

      {integrations.map((integration, index) => (
        <div key={index} className="bg-gray-700/50 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Provider</label>
                <select
                  value={integration.provider}
                  onChange={(e) => handleIntegrationChange(index, 'provider', e.target.value)}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
                >
                  {Object.keys(availableServices).map(provider => (
                    <option key={provider}>{provider}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Data Source</label>
                <select
                  value={integration.dataSource}
                  onChange={(e) => handleIntegrationChange(index, 'dataSource', e.target.value)}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
                >
                  <option value="training">Training Data</option>
                  <option value="production">Production Data</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Services</label>
                <select
                  multiple
                  value={integration.services}
                  onChange={(e) => handleIntegrationChange(index, 'services', 
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
                  size={4}
                >
                  {availableServices[integration.provider as keyof typeof availableServices].map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeIntegration(index)}
              className="ml-4 text-gray-400 hover:text-red-400"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}