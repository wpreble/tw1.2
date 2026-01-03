import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Message, Framework } from '../types';
import { apiService } from '../services/api';
import { storageService } from '../services/storage';
import { FRAMEWORKS } from '../constants/frameworks';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentFramework, setCurrentFramework] = useState<Framework>('general');
  const [showFrameworks, setShowFrameworks] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Load messages and framework on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      storageService.saveMessages(messages);
    }
  }, [messages]);

  const loadData = async () => {
    const savedMessages = await storageService.loadMessages();
    const savedFramework = await storageService.loadFramework();
    setMessages(savedMessages);
    setCurrentFramework(savedFramework);
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
      framework: currentFramework,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await apiService.sendMessage(updatedMessages, currentFramework);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
        framework: currentFramework,
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFrameworkChange = async (framework: Framework) => {
    setCurrentFramework(framework);
    await storageService.saveFramework(framework);
    setShowFrameworks(false);
  };

  const handleClearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setMessages([]);
            await storageService.clearMessages();
          },
        },
      ]
    );
  };

  const currentFrameworkInfo = FRAMEWORKS.find(f => f.id === currentFramework);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Way</Text>
        <Text style={styles.headerSubtitle}>
          Disconnect. Renew. Clarify.
        </Text>
      </View>

      {/* Framework Selector */}
      <View style={styles.frameworkBar}>
        <TouchableOpacity
          style={styles.frameworkButton}
          onPress={() => setShowFrameworks(!showFrameworks)}
        >
          <Text style={styles.frameworkIcon}>{currentFrameworkInfo?.icon}</Text>
          <Text style={styles.frameworkText}>{currentFrameworkInfo?.title}</Text>
          <Text style={styles.frameworkArrow}>{showFrameworks ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearChat}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Framework Dropdown */}
      {showFrameworks && (
        <View style={styles.frameworkDropdown}>
          {FRAMEWORKS.map(framework => (
            <TouchableOpacity
              key={framework.id}
              style={[
                styles.frameworkOption,
                currentFramework === framework.id && styles.frameworkOptionActive,
              ]}
              onPress={() => handleFrameworkChange(framework.id)}
            >
              <Text style={styles.frameworkOptionIcon}>{framework.icon}</Text>
              <View style={styles.frameworkOptionText}>
                <Text style={styles.frameworkOptionTitle}>{framework.title}</Text>
                <Text style={styles.frameworkOptionDesc}>{framework.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✝️</Text>
            <Text style={styles.emptyTitle}>Welcome to The Way</Text>
            <Text style={styles.emptyText}>
              Start a conversation to disconnect from the world, renew your mind through
              Scripture, and clarify your God-given vision.
            </Text>
          </View>
        ) : (
          messages.map(message => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === 'user' ? styles.userText : styles.assistantText,
                ]}
              >
                {message.content}
              </Text>
            </View>
          ))
        )}
        {isLoading && (
          <View style={styles.loadingBubble}>
            <ActivityIndicator color="#666" />
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          multiline
          maxLength={1000}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d8',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2c2c2c',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    letterSpacing: 2,
  },
  frameworkBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d8',
  },
  frameworkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  frameworkIcon: {
    fontSize: 20,
  },
  frameworkText: {
    fontSize: 16,
    color: '#2c2c2c',
    fontWeight: '500',
  },
  frameworkArrow: {
    fontSize: 12,
    color: '#999',
  },
  clearButton: {
    fontSize: 14,
    color: '#999',
    padding: 4,
  },
  frameworkDropdown: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d8',
  },
  frameworkOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0e8',
  },
  frameworkOptionActive: {
    backgroundColor: '#f9f9f5',
  },
  frameworkOptionIcon: {
    fontSize: 24,
  },
  frameworkOptionText: {
    flex: 1,
  },
  frameworkOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c2c2c',
    marginBottom: 2,
  },
  frameworkOptionDesc: {
    fontSize: 13,
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2c2c2c',
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0d8',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  assistantText: {
    color: '#2c2c2c',
  },
  loadingBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0d8',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0d8',
    gap: 12,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f9f9f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2c2c2c',
  },
  sendButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
