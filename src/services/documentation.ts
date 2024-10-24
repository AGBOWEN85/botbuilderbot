import { Bot } from '../types/bot';
import { DocumentationConfig, Documentation, UserManual, APIReference } from '../types/documentation';
import { marked } from 'marked';
import mermaid from 'mermaid';

class DocumentationService {
  private static instance: DocumentationService;
  private docs: Map<string, Documentation> = new Map();
  private manuals: Map<string, UserManual> = new Map();

  private constructor() {
    this.initializeService();
  }

  public static getInstance(): DocumentationService {
    if (!DocumentationService.instance) {
      DocumentationService.instance = new DocumentationService();
    }
    return DocumentationService.instance;
  }

  private initializeService(): void {
    // Configure markdown renderer
    marked.setOptions({
      gfm: true,
      breaks: true,
      headerIds: true
    });

    // Configure mermaid for diagrams
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose'
    });
  }

  public async generateDocumentation(bot: Bot, config: DocumentationConfig): Promise<Documentation> {
    const documentation: Documentation = {
      id: Math.random().toString(36).substr(2, 9),
      botId: bot.id,
      timestamp: new Date(),
      sections: {
        overview: await this.generateOverview(bot),
        architecture: await this.generateArchitecture(bot),
        api: await this.generateAPIReference(bot),
        deployment: await this.generateDeploymentGuide(bot),
        maintenance: await this.generateMaintenanceGuide(bot)
      },
      diagrams: await this.generateDiagrams(bot),
      version: bot.currentVersion
    };

    this.docs.set(bot.id, documentation);
    return documentation;
  }

  public async generateUserManual(bot: Bot): Promise<UserManual> {
    const manual: UserManual = {
      id: Math.random().toString(36).substr(2, 9),
      botId: bot.id,
      timestamp: new Date(),
      sections: {
        introduction: this.generateIntroduction(bot),
        setup: this.generateSetupGuide(bot),
        usage: this.generateUsageGuide(bot),
        troubleshooting: this.generateTroubleshooting(bot),
        faq: this.generateFAQ(bot)
      },
      version: bot.currentVersion
    };

    this.manuals.set(bot.id, manual);
    return manual;
  }

  private async generateOverview(bot: Bot): Promise<string> {
    return marked.parse(`
# ${bot.name} Overview

## Purpose
${bot.primaryFunction}

## Key Features
${this.generateFeaturesList(bot)}

## Technical Stack
- Base Model: ${bot.baseModel}
- Environment: ${bot.environment}
- Cloud Integrations: ${bot.cloudIntegrations.map(i => i.provider).join(', ')}

## Performance Metrics
- Accuracy: ${bot.customization?.priority === 'accuracy' ? 'High Priority' : 'Standard'}
- Scalability: ${bot.customization?.scalability}
- Security Level: ${bot.customization?.securityLevel}
    `);
  }

  private generateFeaturesList(bot: Bot): string {
    const features = [
      'Autonomous Learning',
      'Self-optimization',
      'Error Recovery',
      'Performance Monitoring'
    ];

    return features.map(f => `- ${f}`).join('\n');
  }

  private async generateArchitecture(bot: Bot): Promise<string> {
    return marked.parse(`
# System Architecture

## Components
${this.generateComponentsList(bot)}

## Data Flow
${this.generateDataFlow(bot)}

## Integration Points
${this.generateIntegrationPoints(bot)}
    `);
  }

  private generateComponentsList(bot: Bot): string {
    return `
- Core Processing Unit
- Learning Module
- API Interface
- Data Processing Pipeline
- Monitoring System
    `;
  }

  private generateDataFlow(bot: Bot): string {
    return `
1. Input Processing
2. Data Validation
3. Core Processing
4. Result Generation
5. Response Delivery
    `;
  }

  private generateIntegrationPoints(bot: Bot): string {
    return bot.cloudIntegrations.map(integration => `
### ${integration.provider}
Services:
${integration.services.map(service => `- ${service}`).join('\n')}
    `).join('\n');
  }

  private async generateAPIReference(bot: Bot): Promise<APIReference> {
    return {
      endpoints: [
        {
          path: '/api/v1/process',
          method: 'POST',
          description: 'Process new data',
          parameters: [
            { name: 'input', type: 'object', required: true }
          ],
          responses: [
            { code: 200, description: 'Success' },
            { code: 400, description: 'Invalid input' }
          ]
        }
      ],
      authentication: {
        type: 'Bearer',
        description: 'JWT authentication required for all endpoints'
      },
      examples: [
        {
          title: 'Basic Request',
          code: `
curl -X POST \\
  http://api.bot.com/v1/process \\
  -H 'Authorization: Bearer <token>' \\
  -d '{"data": "example"}'
          `
        }
      ]
    };
  }

  private async generateDiagrams(bot: Bot): Promise<string[]> {
    const architectureDiagram = `
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Bot Core]
    C --> D[Processing Unit]
    C --> E[Learning Module]
    D --> F[Data Store]
    E --> F
    `;

    const flowDiagram = `
sequenceDiagram
    participant U as User
    participant A as API
    participant B as Bot
    participant D as Database
    U->>A: Request
    A->>B: Process
    B->>D: Store
    D-->>B: Confirm
    B-->>A: Response
    A-->>U: Result
    `;

    return [
      await mermaid.render('architecture', architectureDiagram),
      await mermaid.render('flow', flowDiagram)
    ];
  }

  private generateIntroduction(bot: Bot): string {
    return `
# ${bot.name} User Manual

Welcome to ${bot.name}, an advanced AI bot designed for ${bot.primaryFunction}.

## Overview
This manual will guide you through the setup, usage, and maintenance of your bot.
    `;
  }

  private generateSetupGuide(bot: Bot): string {
    return `
## Setup Guide

### Prerequisites
- Node.js ${process.version}
- Access to ${bot.environment}
- Required API keys

### Installation
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the bot
    `;
  }

  private generateUsageGuide(bot: Bot): string {
    return `
## Usage Guide

### Basic Operations
1. Starting the bot
2. Monitoring status
3. Handling requests
4. Viewing analytics

### Advanced Features
- Custom configurations
- Integration options
- Performance tuning
    `;
  }

  private generateTroubleshooting(bot: Bot): string {
    return `
## Troubleshooting

### Common Issues
1. Connection problems
2. Performance degradation
3. Integration errors

### Solutions
- Detailed steps for each issue
- Contact information for support
    `;
  }

  private generateFAQ(bot: Bot): string {
    return `
## Frequently Asked Questions

1. How do I update the bot?
2. What are the system requirements?
3. How can I optimize performance?
4. What security measures are in place?
    `;
  }

  private async generateDeploymentGuide(bot: Bot): Promise<string> {
    return marked.parse(`
# Deployment Guide

## Environment Setup
1. Configure cloud provider (${bot.environment})
2. Set up monitoring
3. Initialize databases

## Deployment Steps
1. Build process
2. Configuration
3. Validation
4. Launch

## Monitoring
- Performance metrics
- Health checks
- Logging
    `);
  }

  private async generateMaintenanceGuide(bot: Bot): Promise<string> {
    return marked.parse(`
# Maintenance Guide

## Routine Tasks
- Daily health checks
- Weekly backups
- Monthly performance reviews

## Updates
- Version control
- Testing procedures
- Rollback processes

## Optimization
- Performance tuning
- Resource management
- Scaling guidelines
    `);
  }

  public getDocumentation(botId: string): Documentation | undefined {
    return this.docs.get(botId);
  }

  public getUserManual(botId: string): UserManual | undefined {
    return this.manuals.get(botId);
  }
}

export default DocumentationService;