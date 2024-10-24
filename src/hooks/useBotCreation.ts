import { useState } from 'react';
import { Bot, BotCreationData } from '../types/bot';

export function useBotCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBot = async (data: BotCreationData): Promise<Bot | null> => {
    setIsCreating(true);
    setError(null);

    try {
      // Validate input
      if (!data.name.trim()) {
        throw new Error('Bot name is required');
      }

      if (data.cloudIntegrations.length > 0) {
        for (const integration of data.cloudIntegrations) {
          if (integration.services.length === 0) {
            throw new Error('At least one service must be selected for each cloud integration');
          }
        }
      }

      // Simulate bot creation with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newBot: Bot = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        primaryFunction: data.primaryFunction,
        baseModel: data.baseModel,
        environment: data.environment,
        cloudIntegrations: data.cloudIntegrations,
        config: data.config ? JSON.parse(data.config) : {},
        status: 'initializing',
        createdAt: new Date()
      };

      return newBot;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create bot');
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return { createBot, isCreating, error };
}