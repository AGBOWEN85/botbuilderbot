import { useState, useEffect } from 'react';
import RecoveryService from '../services/recovery';
import { RecoveryState, ErrorLog, BackupData } from '../types/recovery';

export function useRecovery() {
  const [recoveryState, setRecoveryState] = useState<RecoveryState>({
    status: 'stable',
    lastBackup: null,
    activeRecovery: null
  });
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [backups, setBackups] = useState<BackupData[]>([]);

  const recoveryService = RecoveryService.getInstance();

  useEffect(() => {
    // Poll recovery state periodically
    const interval = setInterval(() => {
      setRecoveryState(recoveryService.getRecoveryState());
      setErrorLogs(recoveryService.getErrorLogs());
      setBackups(recoveryService.getBackups('system'));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const triggerRecovery = async (issues: any[]) => {
    return await recoveryService.triggerRecovery(issues);
  };

  const createBackup = async (context: string = 'system') => {
    return await recoveryService.createBackup(context);
  };

  return {
    recoveryState,
    errorLogs,
    backups,
    triggerRecovery,
    createBackup
  };
}