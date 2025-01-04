import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export const useChat = () => {
  const { messages, sendMessage, isLoading } = useContext(ChatContext);
  return { messages, sendMessage, isLoading };
};
