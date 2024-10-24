import React from 'react';
import { Bot, Brain, Shield, BarChart3, MessageSquare } from 'lucide-react';
import { BotTemplate } from '../types/bot';

interface BotTemplateSelectorProps {
  selectedTemplate?: string;
  onSelect: (templateId: string) => void;
}

export default function BotTemplateSelector({ selectedTemplate, onSelect }: BotTemplateSelectorProps) {
  const templates: BotTemplate[] = [
    {
      id: 'nlp-chatbot',
      name: 'NLP Chatbot',
      description: 'Advanced natural language processing bot for customer interactions',
      type: 'nlp',
      baseConfig: {
        modelType: 'transformer',
        contextWindow: 2048,
      },
      requirements: ['Natural Language Processing', 'Context Management'],
      features: ['Multi-language Support', 'Sentiment Analysis', 'Intent Recognition'],
    },
    {
      id: 'security-bot',
      name: 'Security Bot',
      description: 'AI-powered security monitoring and threat detection',
      type: 'security',
      baseConfig: {
        scanInterval: 60,
        threatLevel: 'high',
      },
      requirements: ['Pattern Recognition', 'Real-time Monitoring'],
      features: ['Threat Detection', 'Automated Response', 'Audit Logging'],
    },
    {
      id: 'analytics-bot',
      name: 'Analytics Bot',
      description: 'Data analysis and insights generation bot',
      type: 'analytics',
      baseConfig: {
        dataProcessing: 'stream',
        accuracy: 0.99,
      },
      requirements: ['Data Processing', 'Statistical Analysis'],
      features: ['Predictive Analytics', 'Automated Reporting', 'Trend Analysis'],
    },
  ];

  const getTemplateIcon = (type: BotTemplate['type']) => {
    switch (type) {
      case 'nlp':
        return MessageSquare;
      case 'security':
        return Shield;
      case 'analytics':
        return BarChart3;
      default:
        return Bot;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Brain className="w-5 h-5 text-blue-400" />
        Bot Templates
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = getTemplateIcon(template.type);
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`
                p-4 rounded-lg text-left transition-colors
                ${isSelected 
                  ? 'bg-blue-500 border-2 border-blue-400' 
                  : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                <h4 className="font-medium text-white">{template.name}</h4>
              </div>
              
              <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
                {template.description}
              </p>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`
                        text-xs px-2 py-1 rounded-full
                        ${isSelected 
                          ? 'bg-blue-400/20 text-white' 
                          : 'bg-gray-600/50 text-gray-300'
                        }
                      `}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}