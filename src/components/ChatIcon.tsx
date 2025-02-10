import React, { useState } from 'react';
import ChatBox from './Chatbox';
import '../styles/ChatIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

interface Message {
  sender: 'user' | 'bot' | 'ChatGPT';
  text: string;
}

const ChatIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can I help you?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    console.log('Toggle chat clicked, current state:', !isOpen);
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // Simulate a response from ChatGPT
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ChatGPT', text: 'This is a simulated response.' }
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <ChatBox
        isOpen={isOpen}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSend={handleSend}
        toggleChat={toggleChat}
      />
      <div className="chat-icon" onClick={toggleChat}>
        <FontAwesomeIcon icon={faRobot} size="lg" />
      </div>
    </>
  );
};

export default ChatIcon;