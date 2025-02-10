import React, { useState } from 'react';
import { CommunityMatcher } from '../services/communityMatchingService';
import { mockCommunities } from '../data/mockCommunities';
import { UserProfile, CommunityMatch } from '../types/community';

export const CommunityMatchingTest: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<CommunityMatch[]>([]);

    // Test user profile
    const testProfile: UserProfile = {
        id: 'test-user',
        name: 'Test User',
        experience: { level: 'Intermediate', years: 2 },
        interests: ['Technical Analysis', 'Automation'],
        tradingStyles: ['Day Trading', 'Swing Trading'],
        preferredMarkets: ['Stocks', 'Crypto'],
        languages: ['English'],
        activeHours: ['9:00-17:00'],
        bio: 'Test trader bio',
        analysisPreferences: ['Technical', 'Fundamental'],
        riskTolerance: 'Moderate',
        averagePosition: { size: 1000, duration: 'day' },
        preferredTimeZone: 'UTC',
        learningGoals: ['Improve Technical Analysis'],
        tradingFrequency: 'daily',
        technicalIndicators: ['RSI', 'MACD'],
        successMetrics: ['Win Rate', 'Profit Factor']
    };

    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setMatches([]);
        
        // Check internet connection
        if (!navigator.onLine) {
            setError('No internet connection. Please check your network.');
            setLoading(false);
            return;
        }

        console.log('Starting community matching test...');
        console.log('Test Profile:', testProfile);
        console.log('API Key:', import.meta.env.VITE_HUGGINGFACE_API_KEY ? 'Present' : 'Missing');

        try {
            const matcher = new CommunityMatcher();
            const results = await matcher.findMatchingCommunities(
                testProfile,
                mockCommunities,
                []
            );
            
            setMatches(results);
            console.log('Matching Results:', results);

        } catch (error) {
            console.error('Error during matching:', error);
            setError(
                `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n` +
                'Please check:\n' +
                '1. Internet connection\n' +
                '2. API key in .env file\n' +
                '3. HuggingFace service status'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Community Matching Test</h2>
            
            <div className="mb-6 bg-blue-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Test Profile</h3>
                <pre className="bg-white p-2 rounded">
                    {JSON.stringify(testProfile, null, 2)}
                </pre>
            </div>

            <button
                onClick={handleTest}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? 'Testing...' : 'Run Test'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded whitespace-pre-line">
                    {error}
                </div>
            )}

            {matches.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Matching Results</h3>
                    <div className="space-y-4">
                        {matches.map((match, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-semibold">
                                        {match.community.name}
                                    </h4>
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                        {(match.matchScore * 100).toFixed(1)}% Match
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2">{match.community.description}</p>
                                <div className="mt-3">
                                    <h5 className="font-semibold">Match Reasons:</h5>
                                    <ul className="list-disc list-inside mt-1">
                                        {match.matchReasons.map((reason, i) => (
                                            <li key={i} className="text-gray-700">{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
                Check the browser console (F12) for detailed logs
            </div>
        </div>
    );
}; 