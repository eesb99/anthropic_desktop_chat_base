import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const ChatHistory = () => {
  const { chatHistory, loadChat, currentChatId } = useContext(ChatContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="chat-history">
      <h2>Chat History</h2>
      <div className="chat-list">
        {chatHistory.sort((a, b) => new Date(b.lastMessage) - new Date(a.lastMessage)).map((chat) => (
          <div
            key={chat.id}
            className={`chat-entry ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => loadChat(chat.id)}
          >
            <div className="chat-preview">{chat.preview}</div>
            <div className="chat-timestamp">{formatDate(chat.lastMessage)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
