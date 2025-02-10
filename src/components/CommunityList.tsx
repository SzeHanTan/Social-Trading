import React from 'react';
import { Community, CommunityMatch } from '../types/community';

interface Props {
    communities: Community[];
    matches: CommunityMatch[];
}

export const CommunityList: React.FC<Props> = ({ communities, matches }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">All Communities</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {communities.map((community) => {
                    const match = matches.find(m => m.community.id === community.id);
                    return (
                        <div 
                            key={community.id} 
                            className="bg-white rounded-xl shadow-lg p-6 community-card"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{community.name}</h3>
                                    <p className="text-gray-600 mt-1">{community.description}</p>
                                </div>
                                {match && (
                                    <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {(match.matchScore * 100).toFixed(0)}% Match
                                    </span>
                                )}
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {community.topics.map((topic, index) => (
                                        <span 
                                            key={index}
                                            className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {community.memberCount} members
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        {community.experienceLevel}
                                    </div>
                                </div>
                                <button className="animated-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg 
                                                 font-medium transition-all duration-200 transform hover:scale-105">
                                    Join Community
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}; 