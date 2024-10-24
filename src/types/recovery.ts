export interface ErrorLog {
  timestamp: Date;
  type: 'system' | 'process' | 'recovery' | 'backup';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  context?: any;
}

export interface BackupData {
  id: string;
  timestamp: Date;
  context: string;
  data: any;
  checksum: string;
}

export interface RecoveryStep {
  timestamp: Date;
  action: string;
  success: boolean;
  message: string;
}

export interface ActiveRecovery {
  startTime: Date;
  issues: any[];
  steps: RecoveryStep[];
}

export interface RecoveryState {
  status: 'stable' | 'recovering' | 'failed';
  lastBackup: BackupData | null;
  activeRecovery: ActiveRecovery | null;
}

export interface SystemStatus {
  timestamp: Date;
  healthy: boolean;
  issues: Array<{
    type: string;
    severity: string;
    message: string;
  }>;
}