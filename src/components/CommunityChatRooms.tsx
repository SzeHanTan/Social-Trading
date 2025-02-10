import React, { useState, useEffect } from 'react';
import { Community } from '../types/community';
import { CommunityChat } from './CommunityChat';
import '../styles/CommunityChat.css';
import { useNavigate } from 'react-router-dom';

export const CommunityChatRooms: React.FC = () => {
    const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
    const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);
    const navigate = useNavigate();

    const otherCommunities = [
        { id: 'comm1', name: 'Community 1' },
        { id: 'comm2', name: 'Community 2' },
        { id: 'comm3', name: 'Community 3' },
    ];

    useEffect(() => {
        const stored = localStorage.getItem('joinedCommunities');
        if (stored) {
            const communities = JSON.parse(stored);
            setJoinedCommunities(communities);
            if (communities.length > 0 && !activeChatRoom) {
                setActiveChatRoom(communities[0].id);
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    if (joinedCommunities.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat-layout">
            {/* Left Column - Other Communities */}
            <div className="chat-sidebar left">
                <h2 className="sidebar-title">Other Communities</h2>
                <div className="community-list">
                    {otherCommunities.map((community) => (
                        <div key={community.id} className="community-item">
                            {community.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Column - Chat Area */}
            <div className="chat-main">
                <div className="chat-header">
                    <h2>{joinedCommunities.find(c => c.id === activeChatRoom)?.name || 'Select a Chat Room'}</h2>
                </div>
                <div className="chat-messages">
                    {/* Chat messages will go here */}
                </div>
                <div className="chat-input">
                    <input type="text" className="message-input" placeholder="Type a message..." />
                    <button className="send-button">Send</button>
                </div>
            </div>

            {/* Right Column - Your Chat Rooms */}
            <div className="chat-sidebar right">
                <h2 className="sidebar-title">Your Chat Rooms</h2>
                <div className="community-list">
                    {joinedCommunities.map((community, index) => (
                        <div 
                            key={community.id}
                            className={`community-item ${community.id === activeChatRoom ? 'active' : ''}`}
                            onClick={() => setActiveChatRoom(community.id)}
                        >
                            Chat Room {index + 1}: {community.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 