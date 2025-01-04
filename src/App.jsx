import React, { useState } from 'react';
import ChatHistory from './components/Chat/ChatHistory';
import ChatInput from './components/Chat/ChatInput';
import ChatMessage from './components/Chat/ChatMessage';
import Settings from './components/Settings/Settings';
import { ChatContext } from './context/ChatContext';
import { ChatProvider } from './context/ChatContext';
import './styles.css';

const ChatMessages = () => {
  const { messages, isLoading } = React.useContext(ChatContext);

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

function App() {
  const [showHistory, setShowHistory] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  return (
    <ChatProvider>
      <div className="app">
        <button 
          className="toggle-button toggle-history" 
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? '◀' : '▶'}
        </button>

        <div className={`chat-history-panel ${showHistory ? '' : 'hidden'}`}>
          <ChatHistory />
        </div>

        <div className="main-content">
          <ChatMessages />
          <ChatInput />
        </div>

        <div className={`settings-panel ${showSettings ? '' : 'hidden'}`}>
          <Settings />
        </div>

        <button 
          className="toggle-button toggle-settings" 
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? '▶' : '◀'}
        </button>
      </div>
    </ChatProvider>
  );
}

export default App;
