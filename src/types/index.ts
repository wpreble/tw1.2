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

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  framework: Framework;
  title?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseMessage {
  id: string;
  session_id: string;
  user_id: string;
  role: MessageRole;
  content: string;
  framework?: Framework;
  created_at: string;
}
