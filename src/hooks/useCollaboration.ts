import { useState } from 'react';
import CollaborationService from '../services/collaboration';
import { CollaborationRequest, CollaborationSession, ProjectUpdate } from '../types/collaboration';

export function useCollaboration() {
  const [activeSession, setActiveSession] = useState<CollaborationSession | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const collaborationService = CollaborationService.getInstance();

  const startSession = async (request: CollaborationRequest) => {
    setError(null);
    try {
      const session = await collaborationService.createSession(request);
      setActiveSession(session);
      return session;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
      return null;
    }
  };

  const updateProject = async (update: Omit<ProjectUpdate, 'timestamp'>) => {
    if (!activeSession) return false;

    try {
      const success = await collaborationService.updateProject(activeSession.id, {
        ...update,
        timestamp: new Date()
      });

      if (success) {
        setUpdates(collaborationService.getSessionUpdates(activeSession.id));
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      return false;
    }
  };

  const endSession = async () => {
    if (!activeSession) return false;

    try {
      const success = await collaborationService.endSession(activeSession.id);
      if (success) {
        setActiveSession(null);
        setUpdates([]);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end session');
      return false;
    }
  };

  return {
    activeSession,
    updates,
    error,
    startSession,
    updateProject,
    endSession
  };
}