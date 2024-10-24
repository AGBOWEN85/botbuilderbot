export interface DocumentationConfig {
  format: 'markdown' | 'html' | 'pdf';
  includeExamples: boolean;
  includeDiagrams: boolean;
  detailLevel: 'basic' | 'detailed' | 'comprehensive';
}

export interface APIEndpoint {
  path: string;
  method: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
  responses: Array<{
    code: number;
    description: string;
  }>;
}

export interface APIReference {
  endpoints: APIEndpoint[];
  authentication: {
    type: string;
    description: string;
  };
  examples: Array<{
    title: string;
    code: string;
  }>;
}

export interface Documentation {
  id: string;
  botId: string;
  timestamp: Date;
  sections: {
    overview: string;
    architecture: string;
    api: APIReference;
    deployment: string;
    maintenance: string;
  };
  diagrams: string[];
  version: string;
}

export interface UserManual {
  id: string;
  botId: string;
  timestamp: Date;
  sections: {
    introduction: string;
    setup: string;
    usage: string;
    troubleshooting: string;
    faq: string;
  };
  version: string;
}