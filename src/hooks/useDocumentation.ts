import { useState } from 'react';
import DocumentationService from '../services/documentation';
import { Documentation, UserManual, DocumentationConfig } from '../types/documentation';
import { Bot } from '../types/bot';

export function useDocumentation() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const documentationService = DocumentationService.getInstance();

  const generateDocumentation = async (bot: Bot, config: DocumentationConfig): Promise<Documentation | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      return await documentationService.generateDocumentation(bot, config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate documentation');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateUserManual = async (bot: Bot): Promise<UserManual | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      return await documentationService.generateUserManual(bot);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate user manual');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const getDocumentation = (botId: string): Documentation | undefined => {
    return documentationService.getDocumentation(botId);
  };

  const getUserManual = (botId: string): UserManual | undefined => {
    return documentationService.getUserManual(botId);
  };

  return {
    generateDocumentation,
    generateUserManual,
    getDocumentation,
    getUserManual,
    isGenerating,
    error
  };
}