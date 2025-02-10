import React, { useState, useEffect } from 'react';
import '../styles/ChatIcon.css';
import io from 'socket.io-client';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I\'m your trading assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { sender: 'user', text: message }]);
      
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      setMessage("");
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="chat-icon-button"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="chat-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="chat-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <>
          <div className="overlay active" onClick={toggleChat}></div>
          <div className="chat-bubble active">
            <div className="chat-header">
              <h2>Trading Assistant</h2>
              <button onClick={toggleChat} className="close-button">&times;</button>
            </div>
            <div className="chat-content">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot">
                    <p>Thinking...</p>
                  </div>
                )}
              </div>
              <form onSubmit={handleSend} className="input-form">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about trading..."
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !message.trim()}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget; 