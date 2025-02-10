import React, { useState } from 'react';
import '../styles/ChatIcon.css';

interface Message {
  sender: string;
  text: string;
}

interface ChatBoxProps {
  isOpen: boolean;
  messages: Message[];
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSend: (event: React.FormEvent) => void;
  toggleChat: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, messages, input, handleInputChange, handleSend, toggleChat }) => {
  const [loading, setLoading] = useState(false);

  const formatResponse = (text: string): string => {
    const bulletPoints = new Set();
    const formattedText = text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong><br>')
      .replace(/\((.*?)\)/g, '<p>$1</p><br>')
      .replace(/\^(.*?)\^/g, (match, p1) => {
        if (bulletPoints.has(p1)) return '';
        bulletPoints.add(p1);
        return `<li>${p1}</li><br>`;
      });
    return formattedText;
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleChat}></div>
      <div className={`chat-bubble ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <h2>AI assistant</h2>
          <button onClick={toggleChat} className="close-button">&times;</button>
        </div>
        <div className="chat-content">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p dangerouslySetInnerHTML={{ __html: formatResponse(msg.text) }} />
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <p>Generating...</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="input-form">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;