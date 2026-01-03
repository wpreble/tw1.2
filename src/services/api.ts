import axios from 'axios';
import { Message, ChatResponse, Framework } from '../types';
import Constants from 'expo-constants';

// Get API URL from environment or use localhost
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async sendMessage(
    messages: Message[],
    framework: Framework = 'general'
  ): Promise<string> {
    try {
      // Convert messages to OpenAI format (only user and assistant messages)
      const apiMessages = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role,
          content: m.content,
        }));

      const response = await axios.post<ChatResponse>(`${API_URL}/api/chat`, {
        messages: apiMessages,
        framework,
      });

      return response.data.message;
    } catch (error: any) {
      console.error('API Error:', error);
      if (error.response) {
        throw new Error(error.response.data.error || 'Failed to get response');
      }
      throw new Error('Network error - please check if the API server is running');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/health`);
      return response.data.status === 'ok';
    } catch (error) {
      return false;
    }
  }
}

export const apiService = ApiService.getInstance();
