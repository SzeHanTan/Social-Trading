import React, { useState } from 'react';
import { Community, CommunityMatch, UserProfile } from '../types/community';
import '../styles/CommunityMatching.css';
import { useNavigate } from 'react-router-dom';
import { getEmbeddings } from '../utils/huggingface';

interface Props {
    matches: CommunityMatch[];
    onJoinCommunity: (community: Community) => void;
    onViewAll: () => void;
}

interface MatchingLogic {
  calculateSimilarity(profile1: UserProfile, profile2: UserProfile): Promise<number>;
  findMatches(userProfile: UserProfile, communities: Community[]): Promise<Community[]>;
}

class AIMatchingLogic implements MatchingLogic {
  async calculateSimilarity(profile1: UserProfile, profile2: UserProfile): Promise<number> {
    // Convert profiles to text representations
    const text1 = this.profileToText(profile1);
    const text2 = this.profileToText(profile2);

    // Get embeddings from HuggingFace
    const embeddings = await getEmbeddings([text1, text2]);
    
    // Calculate cosine similarity between embeddings
    return this.cosineSimilarity(embeddings[0], embeddings[1]);
  }

  private profileToText(profile: UserProfile): string {
    return `Trading style: ${profile.tradingStyle}. 
            Markets: ${profile.preferredMarkets.join(', ')}. 
            Experience: ${profile.experienceLevel}. 
            Risk tolerance: ${profile.riskTolerance}.`;
  }

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (norm1 * norm2);
  }

  async findMatches(userProfile: UserProfile, communities: Community[]): Promise<Community[]> {
    const similarities = await Promise.all(
      communities.map(async community => ({
        community,
        similarity: await this.calculateSimilarity(userProfile, community.profile)
      }))
    );

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .map(result => result.community);
  }
}

export const CommunityMatches: React.FC<Props> = ({ matches, onJoinCommunity, onViewAll }) => {
    const navigate = useNavigate();
    const [selectedCommunities, setSelectedCommunities] = useState<Community[]>([]);

    React.useEffect(() => {
        // Get the profile data
        const profileData = localStorage.getItem('userProfile');
        if (!profileData) {
            navigate('/community-profile-form');
            return;
        }
    }, [navigate]);

    const toggleCommunitySelection = (community: Community) => {
        setSelectedCommunities(prev => 
            prev.find(c => c.id === community.id)
                ? prev.filter(c => c.id !== community.id)
                : [...prev, community]
        );
    };

    const handleProceed = () => {
        if (selectedCommunities.length > 0) {
            localStorage.setItem('joinedCommunities', JSON.stringify(selectedCommunities));
            navigate('/community-chats');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recommended Communities</h2>
                <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-600">
                        {selectedCommunities.length} communities selected
                    </span>
                    <button 
                        onClick={handleProceed}
                        disabled={selectedCommunities.length === 0}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
                    >
                        Proceed to Chats
                    </button>
                </div>
            </div>

            <div className="matches-container">
                {matches.map((match) => (
                    <div key={match.community.id} className={`match-card ${
                        selectedCommunities.find(c => c.id === match.community.id) ? 'selected' : ''
                    }`}>
                        <div className="match-card-header">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedCommunities.some(c => c.id === match.community.id)}
                                    onChange={() => toggleCommunitySelection(match.community)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <div>
                                    <h3 className="match-title">{match.community.name}</h3>
                                    <p className="match-description">{match.community.description}</p>
                                </div>
                            </div>
                            <span className="match-badge">
                                {(match.matchScore * 100).toFixed(0)}% Match
                            </span>
                        </div>

                        <div className="match-reasons">
                            <h4 className="reasons-title">Why this matches you:</h4>
                            <ul className="reason-list">
                                {match.matchReasons.map((reason, i) => (
                                    <li key={i} className="reason-item">
                                        <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="topics-container">
                            {match.community.topics.map((topic, i) => (
                                <span key={i} className="topic-tag">
                                    {topic}
                                </span>
                            ))}
                        </div>

                        <div className="match-card-footer">
                            <div className="member-count">
                                <svg className="member-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {match.community.memberCount} members
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 