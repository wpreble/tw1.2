export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  framework?: Framework;
}

export type Framework = 'general' | 'scripture' | 'prayer' | 'action' | 'vision';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  currentFramework: Framework;
}

export interface ChatResponse {
  message: string;
  framework: Framework;
}
