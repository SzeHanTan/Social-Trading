import React, { useState, useEffect } from 'react';
import '../styles/Community.css';
import { CommunityMatcher } from '../services/communityMatchingService';
import { mockCommunities } from '../data/mockCommunities';
import { UserProfile, CommunityMatch } from '../types/community';
import { useAuth } from '../contexts/AuthContext';
import { CommunityProfileForm } from '../components/CommunityProfileForm';
import { CommunityMatches } from '../components/CommunityMatches';
import { CommunityList } from '../components/CommunityList';

type CommunityStep = 'welcome' | 'profile' | 'matches' | 'communities';

const CommunityPage: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [step, setStep] = useState<CommunityStep>('welcome');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [matches, setMatches] = useState<CommunityMatch[]>([]);
    const [loading, setLoading] = useState(false);

    // Check if user needs to complete profile
    useEffect(() => {
        if (isAuthenticated) {
            // In a real app, you would fetch the user's profile from your backend
            const hasProfile = false; // Replace with actual profile check
            if (!hasProfile) {
                setStep('profile');
            } else {
                setStep('communities');
            }
        } else {
            setStep('welcome');
        }
    }, [isAuthenticated]);

    const handleProfileSubmit = async (profile: UserProfile) => {
        setLoading(true);
        try {
            console.log('Submitting profile:', profile);
            const matcher = new CommunityMatcher();
            const results = await matcher.findMatchingCommunities(
                profile,
                mockCommunities,
                []
            );
            console.log('Matching results:', results);
            setMatches(results);
            setUserProfile(profile);
            setStep('matches');

            // In a real app, save the profile to your backend
            // await saveUserProfile(profile);

        } catch (error) {
            console.error('Error finding matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderWelcome = () => (
        <div className="text-center max-w-2xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Welcome to Trading Communities</h1>
            <p className="text-gray-600 mb-8">
                Join communities that match your trading style and interests.
                Connect with traders who share your goals.
            </p>
            {isAuthenticated ? (
                <button
                    onClick={() => setStep('profile')}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Complete Your Profile
                </button>
            ) : (
                <button
                    onClick={() => window.location.href = '/login'}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Login to Get Started
                </button>
            )}
        </div>
    );

    if (!isAuthenticated && step !== 'welcome') {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                    Please log in to access communities
                </p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {step === 'welcome' && renderWelcome()}
            {step === 'profile' && (
                <CommunityProfileForm 
                    onSubmit={handleProfileSubmit}
                    loading={loading}
                />
            )}
            {step === 'matches' && matches.length > 0 && (
                <CommunityMatches 
                    matches={matches}
                    onJoinCommunity={(community) => {
                        console.log('Joining community:', community);
                        // Handle joining community
                    }}
                    onViewAll={() => setStep('communities')}
                />
            )}
            {step === 'communities' && (
                <CommunityList 
                    communities={mockCommunities}
                    matches={matches}
                />
            )}
        </div>
    );
};

export default CommunityPage;