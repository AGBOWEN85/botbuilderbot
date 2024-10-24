import React, { useState } from 'react';
import { Code2, GitBranch, Bot, Loader2 } from 'lucide-react';
import { BotCreationData, CloudIntegration, BotCustomization } from '../types/bot';
import { useBotCreation } from '../hooks/useBotCreation';
import CloudIntegrationForm from './CloudIntegrationForm';
import BotTemplateSelector from './BotTemplateSelector';

export default function BotCreationPanel() {
  const { createBot, isCreating, error } = useBotCreation();
  const [formData, setFormData] = useState<BotCreationData>({
    name: '',
    primaryFunction: 'Data Analysis',
    baseModel: 'GPT-4',
    environment: 'AWS',
    cloudIntegrations: [],
    config: '',
    customization: {
      priority: 'accuracy',
      securityLevel: 'enhanced',
      scalability: 'medium',
      userExperience: 'advanced'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bot = await createBot(formData);
    if (bot) {
      setFormData({
        name: '',
        primaryFunction: 'Data Analysis',
        baseModel: 'GPT-4',
        environment: 'AWS',
        cloudIntegrations: [],
        config: '',
        customization: {
          priority: 'accuracy',
          securityLevel: 'enhanced',
          scalability: 'medium',
          userExperience: 'advanced'
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCustomizationChange = (field: keyof BotCustomization, value: string) => {
    setFormData(prev => ({
      ...prev,
      customization: {
        ...prev.customization!,
        [field]: value
      }
    }));
  };

  const handleCloudIntegrationsChange = (cloudIntegrations: CloudIntegration[]) => {
    setFormData(prev => ({
      ...prev,
      cloudIntegrations
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setFormData(prev => ({
      ...prev,
      template: templateId
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Bot className="w-6 h-6 text-blue-400" />
        Create New AI Bot
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <BotTemplateSelector
          selectedTemplate={formData.template}
          onSelect={handleTemplateSelect}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-300">Bot Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
                placeholder="Enter bot name"
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Primary Function</span>
              <select
                name="primaryFunction"
                value={formData.primaryFunction}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
              >
                <option>Data Analysis</option>
                <option>Natural Language Processing</option>
                <option>Computer Vision</option>
                <option>Reinforcement Learning</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-300">Base Model</span>
              <select
                name="baseModel"
                value={formData.baseModel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
              >
                <option>GPT-4</option>
                <option>BERT</option>
                <option>T5</option>
                <option>Custom Architecture</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-300">Primary Environment</span>
              <select
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
              >
                <option>AWS</option>
                <option>Google Cloud</option>
                <option>IBM</option>
                <option>Hybrid</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-300">Priority</span>
            <select
              value={formData.customization?.priority}
              onChange={(e) => handleCustomizationChange('priority', e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
            >
              <option value="speed">Speed</option>
              <option value="accuracy">Accuracy</option>
              <option value="efficiency">Efficiency</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Security Level</span>
            <select
              value={formData.customization?.securityLevel}
              onChange={(e) => handleCustomizationChange('securityLevel', e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
            >
              <option value="standard">Standard</option>
              <option value="enhanced">Enhanced</option>
              <option value="maximum">Maximum</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Scalability</span>
            <select
              value={formData.customization?.scalability}
              onChange={(e) => handleCustomizationChange('scalability', e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">User Experience</span>
            <select
              value={formData.customization?.userExperience}
              onChange={(e) => handleCustomizationChange('userExperience', e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
            >
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </label>
        </div>

        <CloudIntegrationForm 
          integrations={formData.cloudIntegrations}
          onChange={handleCloudIntegrationsChange}
        />

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Advanced Configuration</span>
            <textarea
              name="config"
              value={formData.config}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-20"
              rows={4}
              placeholder="Enter custom configuration in JSON format"
            />
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Code2 className="w-4 h-4" />
            )}
            {isCreating ? 'Creating Bot...' : 'Generate Bot'}
          </button>
          <button
            type="button"
            disabled={isCreating}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
          >
            <GitBranch className="w-4 h-4" />
            Fork Template
          </button>
        </div>
      </div>
    </form>
  );
}