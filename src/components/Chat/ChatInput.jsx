import React, { useState, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { addMessage, startNewChat, isLoading } = useContext(ChatContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await addMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input">
      <button className="new-chat-button" onClick={startNewChat}>
        New Chat
      </button>
      <div className="input-wrapper">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={handleSubmit} disabled={isLoading || !message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
