import React, { useState } from 'react';
import '../styles/CommunityChat.css';

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
}

interface Props {
    communityName: string;
}

export const CommunityChat: React.FC<Props> = ({ communityName }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                text: newMessage,
                sender: 'You',
                timestamp: new Date()
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-layout">
            {/* Left Sidebar */}
            <div className="chat-sidebar">
                <h2 className="sidebar-title">Chats/Communities</h2>
                <div className="community-list">
                    <div className="community-item active">
                        {communityName}
                    </div>
                    <div className="community-item">Community 2</div>
                    <div className="community-item">Community 3</div>
                    <div className="community-item">Community 4</div>
                    <div className="community-item">Community 5</div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="chat-main">
                <div className="chat-header">
                    <h2>{communityName} Chat</h2>
                </div>
                
                <div className="chat-messages">
                    {messages.map(message => (
                        <div key={message.id} className={`message ${message.sender === 'You' ? 'message-sent' : 'message-received'}`}>
                            <div className="message-content">
                                <span className="message-sender">{message.sender}</span>
                                <p className="message-text">{message.text}</p>
                                <span className="message-time">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="chat-input">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                </form>
            </div>

            {/* Right Sidebar */}
            <div className="chat-sidebar right">
                <h2 className="sidebar-title">Suggested Communities</h2>
                <div className="suggested-list">
                    <div className="suggested-item">
                        <span>Community A</span>
                        <button className="join-btn">Join</button>
                    </div>
                    <div className="suggested-item">
                        <span>Community B</span>
                        <button className="join-btn">Join</button>
                    </div>
                    <div className="suggested-item">
                        <span>Community C</span>
                        <button className="join-btn">Join</button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 