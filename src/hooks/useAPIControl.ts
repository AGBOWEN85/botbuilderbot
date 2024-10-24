import { useState } from 'react';
import APIControlService from '../services/apiControl';
import { APIRequest, APIResponse, AccessToken } from '../types/apiControl';

export function useAPIControl() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<APIResponse | null>(null);

  const apiControlService = APIControlService.getInstance();

  const sendCommand = async (request: APIRequest): Promise<APIResponse> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await apiControlService.handleRequest(request);
      setLastResponse(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process command';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        code: 500
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAccessToken = (accessLevel: string): AccessToken => {
    return apiControlService.generateToken(accessLevel);
  };

  return {
    sendCommand,
    generateAccessToken,
    isProcessing,
    error,
    lastResponse
  };
}