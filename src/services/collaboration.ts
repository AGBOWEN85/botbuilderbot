import { CollaborationRequest, CollaborationSession, ProjectUpdate } from '../types/collaboration';

class CollaborationService {
  private static instance: CollaborationService;
  private sessions: Map<string, CollaborationSession> = new Map();
  private updates: ProjectUpdate[] = [];

  private constructor() {}

  public static getInstance(): CollaborationService {
    if (!CollaborationService.instance) {
      CollaborationService.instance = new CollaborationService();
    }
    return CollaborationService.instance;
  }

  public async createSession(request: CollaborationRequest): Promise<CollaborationSession> {
    const session: CollaborationSession = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      participants: [request.initiator],
      startTime: new Date(),
      project: request.project,
      type: request.type
    };

    this.sessions.set(session.id, session);
    return session;
  }

  public async joinSession(sessionId: string, participantId: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.participants.push(participantId);
    return true;
  }

  public async updateProject(sessionId: string, update: ProjectUpdate): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    this.updates.push({
      ...update,
      timestamp: new Date(),
      sessionId
    });

    return true;
  }

  public getSessionUpdates(sessionId: string): ProjectUpdate[] {
    return this.updates.filter(update => update.sessionId === sessionId);
  }

  public async endSession(sessionId: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    session.status = 'completed';
    session.endTime = new Date();
    return true;
  }
}

export default CollaborationService;