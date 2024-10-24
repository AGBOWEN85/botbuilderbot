import { useState } from 'react';
import VersionControlService from '../services/versionControl';
import { Version } from '../types/bot';

export function useVersionControl(botId: string) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const versionControl = VersionControlService.getInstance();

  const createVersion = async (changes: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const newVersion = versionControl.createVersion(botId, changes);
      setVersions(versionControl.getVersions(botId));
      return newVersion;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create version');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deployVersion = async (versionId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await versionControl.deployVersion(botId, versionId);
      if (success) {
        setVersions(versionControl.getVersions(botId));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy version');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const rollbackVersion = async (versionId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await versionControl.rollbackVersion(botId, versionId);
      if (success) {
        setVersions(versionControl.getVersions(botId));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rollback version');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    versions,
    isLoading,
    error,
    createVersion,
    deployVersion,
    rollbackVersion
  };
}