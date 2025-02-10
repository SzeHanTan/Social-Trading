import React, { useState } from 'react';
import { CommunityMatcher } from '../services/communityMatchingService';
import { mockCommunities } from '../data/mockCommunities';
import { UserProfile, CommunityMatch, createUserProfile } from '../types/community';
import '../styles/CommunityMatching.css';

const tradingStyles = ['Day Trading', 'Swing Trading', 'Position Trading', 'Scalping'];
const markets = ['Stocks', 'Forex', 'Cryptocurrency', 'Options', 'Futures', 'ETFs'];
const languages = ['English', 'Chinese', 'Spanish', 'French', 'German'];

export const CommunityMatchingForm: React.FC = () => {
    const [formData, setFormData] = useState<UserProfile>({
        id: '',
        name: '',
        experience: { level: 'Beginner', years: 0 },
        interests: [],
        tradingStyles: [],
        preferredMarkets: [],
        languages: [],
        activeHours: [],
        bio: '',
        analysisPreferences: [],
        riskTolerance: 'Moderate',
        averagePosition: { size: 0, duration: 'day' },
        preferredTimeZone: '',
        learningGoals: [],
        tradingFrequency: 'daily',
        technicalIndicators: [],
        successMetrics: [],
        tradingStyle: '',
        experienceLevel: 'Beginner',
        riskToleranceLevel: 'Moderate'
    });

    const [matches, setMatches] = useState<CommunityMatch[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const matcher = new CommunityMatcher();
            const results = await matcher.findMatchingCommunities(
                formData,
                mockCommunities,
                [] // Add mock existing users here
            );
            setMatches(results);
        } catch (error) {
            console.error('Error finding matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const profile = createUserProfile({
        id: crypto.randomUUID(),
        name: formData.name,
        tradingStyles: formData.tradingStyles,
        preferredMarkets: formData.preferredMarkets,
        tradingStyle: formData.tradingStyles[0] || '',
        experienceLevel: formData.experienceLevel as 'Beginner' | 'Intermediate' | 'Advanced',
        riskTolerance: formData.riskTolerance as 'Conservative' | 'Moderate' | 'Aggressive',
        riskToleranceLevel: formData.riskTolerance,
        experience: { 
            level: formData.experienceLevel as 'Beginner' | 'Intermediate' | 'Advanced',
            years: 0 
        }
    });

    return (
        <div className="community-matching">
            <form onSubmit={handleSubmit} className="matching-form">
                <h2>Find Your Trading Community</h2>

                {/* Basic Info */}
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>

                {/* Experience */}
                <div className="form-section">
                    <h3>Trading Experience</h3>
                    <select
                        value={formData.experience.level}
                        onChange={(e) => setFormData({
                            ...formData,
                            experience: {...formData.experience, level: e.target.value as any}
                        })}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Trading Styles */}
                <div className="form-section">
                    <h3>Trading Styles</h3>
                    <div className="checkbox-group">
                        {tradingStyles.map(style => (
                            <label key={style}>
                                <input
                                    type="checkbox"
                                    checked={formData.tradingStyles.includes(style)}
                                    onChange={(e) => {
                                        const newStyles = e.target.checked
                                            ? [...formData.tradingStyles, style]
                                            : formData.tradingStyles.filter(s => s !== style);
                                        setFormData({...formData, tradingStyles: newStyles});
                                    }}
                                />
                                {style}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Finding Communities...' : 'Find Communities'}
                </button>
            </form>

            {matches.length > 0 && (
                <div className="matches-container">
                    <h2>Recommended Communities</h2>
                    {matches.map(match => (
                        <div key={match.community.id} className="community-card">
                            <div className="match-score">
                                {(match.matchScore * 100).toFixed(0)}% Match
                            </div>
                            <h3>{match.community.name}</h3>
                            <p>{match.community.description}</p>
                            <div className="match-reasons">
                                {match.matchReasons.map((reason, index) => (
                                    <div key={index} className="reason">
                                        ✓ {reason}
                                    </div>
                                ))}
                            </div>
                            <button className="join-button">Join Community</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 