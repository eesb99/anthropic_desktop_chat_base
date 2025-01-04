import React from 'react';
import CodeBlock from './CodeBlock';

const ChatMessage = ({ message }) => {
  const renderContent = (content) => {
    if (!content) return null;
    
    // Split content into parts based on code blocks
    const parts = content.split(/(```[a-z]*\n[\s\S]*?\n```)/);
    
    return parts.map((part, index) => {
      if (!part) return null;
      
      // Check if this part is a code block
      const codeMatch = part.match(/```([a-z]*)\n([\s\S]*?)\n```/);
      
      if (codeMatch) {
        const [, language, code] = codeMatch;
        return <CodeBlock key={index} code={code} language={language || 'python'} />;
      }
      
      // For regular text, split by newlines and wrap in paragraphs
      return (
        <div key={index} className="text-content">
          {part.split('\n').map((line, i) => (
            <p key={i}>{line || ' '}</p>
          ))}
        </div>
      );
    });
  };

  return (
    <div className={`chat-message ${message.role}`}>
      {message && message.content ? renderContent(message.content) : null}
    </div>
  );
};

export default ChatMessage;
