import { Version, Bot } from '../types/bot';

class VersionControlService {
  private static instance: VersionControlService;
  private versions: Map<string, Version[]> = new Map();

  private constructor() {}

  public static getInstance(): VersionControlService {
    if (!VersionControlService.instance) {
      VersionControlService.instance = new VersionControlService();
    }
    return VersionControlService.instance;
  }

  public createVersion(botId: string, changes: string[]): Version {
    const newVersion: Version = {
      id: Math.random().toString(36).substr(2, 9),
      version: this.getNextVersion(botId),
      timestamp: new Date(),
      changes,
      status: 'pending',
      metrics: {
        performance: 0,
        reliability: 0,
        accuracy: 0
      }
    };

    const botVersions = this.versions.get(botId) || [];
    this.versions.set(botId, [...botVersions, newVersion]);

    return newVersion;
  }

  private getNextVersion(botId: string): string {
    const botVersions = this.versions.get(botId) || [];
    if (botVersions.length === 0) return '1.0.0';

    const lastVersion = botVersions[botVersions.length - 1].version;
    const [major, minor, patch] = lastVersion.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
  }

  public async deployVersion(botId: string, versionId: string): Promise<boolean> {
    const botVersions = this.versions.get(botId);
    if (!botVersions) return false;

    const version = botVersions.find(v => v.id === versionId);
    if (!version) return false;

    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 2000));

    version.status = 'deployed';
    version.metrics = {
      performance: 95 + Math.random() * 5,
      reliability: 95 + Math.random() * 5,
      accuracy: 95 + Math.random() * 5
    };

    return true;
  }

  public async rollbackVersion(botId: string, versionId: string): Promise<boolean> {
    const botVersions = this.versions.get(botId);
    if (!botVersions) return false;

    const version = botVersions.find(v => v.id === versionId);
    if (!version || version.status !== 'deployed') return false;

    // Simulate rollback process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const currentVersion = botVersions.find(v => v.status === 'deployed');
    if (currentVersion) {
      currentVersion.status = 'rolled-back';
    }

    version.status = 'deployed';
    return true;
  }

  public getVersions(botId: string): Version[] {
    return this.versions.get(botId) || [];
  }
}

export default VersionControlService;