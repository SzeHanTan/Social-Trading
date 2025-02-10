import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Community.css';
import { CommunityMatcher } from '../services/communityMatchingService';
import { mockCommunities } from '../data/mockCommunities';
import { UserProfile, CommunityMatch } from '../types/community';
import { useAuth } from '../contexts/AuthContext';
import { ProfileModal } from '../components/ProfileModal';
import { CommunityMatches } from '../components/CommunityMatches';
import { CommunityList } from '../components/CommunityList';

const CommunityPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [matches, setMatches] = useState<CommunityMatch[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !userProfile) {
            console.log('Showing profile modal...');
            setShowProfileModal(true);
        }
    }, [isAuthenticated, userProfile]);

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
            setMatches(results);
            setUserProfile(profile);
            setShowProfileModal(false);
        } catch (error) {
            console.error('Error finding matches:', error);
        } finally {
            setLoading(false);
        }
    };

    // Prevent closing modal if profile is not completed
    const handleCloseModal = () => {
        if (userProfile) {
            setShowProfileModal(false);
        } else {
            // Redirect to home if they try to close without completing profile
            navigate('/');
        }
    };

    // Loading state with improved animation
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center p-8 rounded-2xl bg-white shadow-xl">
                    <div className="loading-spinner"></div>
                    <p className="mt-6 text-lg text-gray-700 font-medium">Finding Your Perfect Communities...</p>
                    <p className="mt-2 text-sm text-gray-500">This may take a moment</p>
                </div>
            </div>
        );
    }

    // Login prompt with enhanced design
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                Welcome to Trading Communities
                            </h2>
                            <p className="text-gray-600">
                                Join a community of traders and enhance your trading journey
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span>Connect with experienced traders</span>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span>Access exclusive trading strategies</span>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span>Learn from community insights</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                                         font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 
                                         transform transition-all duration-200 hover:scale-[1.02]"
                            >
                                Login to Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="community-container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <ProfileModal 
                isOpen={showProfileModal}
                onClose={handleCloseModal}
                onSubmit={handleProfileSubmit}
                loading={loading}
            />

            {userProfile && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Trading Communities</h1>
                                <p className="text-gray-600 mt-2">Find your perfect trading community</p>
                            </div>
                            <button
                                onClick={() => setShowProfileModal(true)}
                                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg
                                         hover:bg-blue-600 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>

                    {matches.length > 0 ? (
                        <div className="space-y-6">
                            <CommunityMatches 
                                matches={matches}
                                onJoinCommunity={(community) => {
                                    console.log('Joining community:', community);
                                }}
                                onViewAll={() => {}}
                            />
                        </div>
                    ) : (
                        <CommunityList 
                            communities={mockCommunities}
                            matches={matches}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CommunityPage; 