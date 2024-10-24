export interface APIRequest {
  token: string;
  command: string;
  parameters: any;
  priority?: 'low' | 'normal' | 'high';
}

export interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
  code: number;
}

export interface ControlCommand {
  id: string;
  type: string;
  parameters: any;
  priority: 'low' | 'normal' | 'high';
  timestamp: Date;
}

export interface AccessToken {
  token: string;
  accessLevel: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface CommandStatus {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  timestamp: Date;
}