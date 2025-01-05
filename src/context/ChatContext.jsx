import React, { createContext, useState, useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentMessages, setCurrentMessages] = useState([{
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date().toISOString()
  }]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [settings, setSettings] = useState({
    temperature: 0.7,
    topP: 1,
    maxTokens: 1000,
    model: 'claude-3-opus-20240229',
    systemPrompt: 'You are a helpful AI assistant in a desktop chat application.',
    stream: false,
    markdown: true
  });

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const addMessage = async (content) => {
    setIsLoading(true);
    const userMessage = { role: 'user', content, timestamp: new Date().toISOString() };
    setCurrentMessages(prev => [...prev, userMessage]);

    try {
      const anthropic = new Anthropic({ 
        apiKey: process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY || window.process?.env?.ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true 
      });

      const response = await anthropic.messages.create({
        model: settings.model,
        max_tokens: settings.maxTokens,
        temperature: settings.temperature,
        top_p: settings.topP,
        messages: [{ role: 'user', content }],
        system: settings.systemPrompt
      });

      console.log('Claude API Response:', response);

      const assistantMessage = {
        role: 'assistant',
        content: response.content[0].text,
        timestamp: new Date().toISOString()
      };

      console.log('Assistant Message:', assistantMessage);
      setCurrentMessages(prev => [...prev, assistantMessage]);
      updateChatHistory();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message || 'An unknown error occurred';
      setCurrentMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    // Save current chat to history if it has messages
    if (currentMessages.length > 0) {
      updateChatHistory();
    }
    // Start new chat with greeting
    setCurrentChatId(Date.now());
    setCurrentMessages([{
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString()
    }]);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(chat => chat.id === chatId);
    if (chat) {
      setCurrentChatId(chat.id);
      setCurrentMessages(chat.messages);
    }
  };

  const updateChatHistory = () => {
    setChatHistory(prev => {
      const existingChatIndex = prev.findIndex(chat => chat.id === currentChatId);
      const chatEntry = {
        id: currentChatId,
        messages: currentMessages,
        lastMessage: currentMessages[currentMessages.length - 1]?.timestamp || new Date().toISOString(),
        preview: currentMessages[0]?.content.substring(0, 50) + '...'
      };

      if (existingChatIndex !== -1) {
        // Update existing chat
        const newHistory = [...prev];
        newHistory[existingChatIndex] = chatEntry;
        return newHistory;
      } else {
        // Add new chat
        return [...prev, chatEntry];
      }
    });
  };

  // Update history when messages change
  useEffect(() => {
    if (currentMessages.length > 0) {
      updateChatHistory();
    }
  }, [currentMessages]);

  return (
    <ChatContext.Provider value={{
      messages: currentMessages,
      isLoading,
      addMessage,
      startNewChat,
      loadChat,
      chatHistory,
      currentChatId,
      settings,
      updateSettings
    }}>
      {children}
    </ChatContext.Provider>
  );
};
