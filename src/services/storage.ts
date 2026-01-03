import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message, Framework } from '../types';

const MESSAGES_KEY = '@the_way_messages';
const FRAMEWORK_KEY = '@the_way_framework';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async saveMessages(messages: Message[]): Promise<void> {
    try {
      await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  }

  async loadMessages(): Promise<Message[]> {
    try {
      const messagesJson = await AsyncStorage.getItem(MESSAGES_KEY);
      if (messagesJson) {
        return JSON.parse(messagesJson);
      }
      return [];
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  }

  async clearMessages(): Promise<void> {
    try {
      await AsyncStorage.removeItem(MESSAGES_KEY);
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  }

  async saveFramework(framework: Framework): Promise<void> {
    try {
      await AsyncStorage.setItem(FRAMEWORK_KEY, framework);
    } catch (error) {
      console.error('Error saving framework:', error);
    }
  }

  async loadFramework(): Promise<Framework> {
    try {
      const framework = await AsyncStorage.getItem(FRAMEWORK_KEY);
      return (framework as Framework) || 'general';
    } catch (error) {
      console.error('Error loading framework:', error);
      return 'general';
    }
  }
}

export const storageService = StorageService.getInstance();
