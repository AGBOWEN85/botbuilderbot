export interface CollaborationRequest {
  initiator: string;
  project: string;
  type: 'development' | 'review' | 'training';
}

export interface CollaborationSession {
  id: string;
  status: 'active' | 'paused' | 'completed';
  participants: string[];
  startTime: Date;
  endTime?: Date;
  project: string;
  type: 'development' | 'review' | 'training';
}

export interface ProjectUpdate {
  id?: string;
  sessionId: string;
  type: 'code' | 'config' | 'model' | 'documentation';
  content: any;
  timestamp: Date;
  author: string;
}