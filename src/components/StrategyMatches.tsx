import React, { useState } from 'react';
import { Strategy, StrategyMatch } from '../types/strategy';
import { Notification } from './Notification';
import '../styles/StrategyMatching.css';

interface Props {
    matches: StrategyMatch[];
    onCopyStrategy: (strategy: Strategy, subscription: 'monthly' | 'yearly') => void;
}

export const StrategyMatches: React.FC<Props> = ({ matches, onCopyStrategy }) => {
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    const handleCopyStrategy = async (strategy: Strategy, subscription: 'monthly' | 'yearly') => {
        try {
            await onCopyStrategy(strategy, subscription);
            setNotification({
                message: `Successfully copied ${strategy.name} (${subscription} plan)`,
                type: 'success'
            });
            console.log('Setting notification:', strategy.name, subscription);
        } catch (error) {
            setNotification({
                message: 'Failed to copy strategy. Please try again.',
                type: 'error'
            });
            console.error('Copy strategy error:', error);
        }
    };

    return (
        <div className="strategy-matching">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="container mx-auto px-4">
                <h2 className="section-title">Matching Strategies</h2>
                <div className="results-container">
                    {matches.map(({ strategy, matchScore, matchReasons }, index) => (
                        <div 
                            key={strategy.id} 
                            className="match-item"
                            style={{ '--animation-order': index } as React.CSSProperties}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-800">{strategy.name}</h3>
                                <span className="match-score">
                                    {(matchScore * 100).toFixed(1)}% Match
                                </span>
                            </div>
                            
                            <p className="text-gray-600 my-4">{strategy.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <span className="font-semibold">Type:</span> {strategy.type}
                                </div>
                                <div>
                                    <span className="font-semibold">Sectors:</span> {strategy.sectors.join(', ')}
                                </div>
                            </div>

                            {/* Subscription Options */}
                            <div className="mt-6 space-y-4">
                                <div className="subscription-option">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-semibold">Monthly</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                RM {strategy.pricing.monthly.toFixed(2)}<span className="text-sm text-gray-500">/mo</span>
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log('Monthly button clicked');
                                                handleCopyStrategy(strategy, 'monthly');
                                            }}
                                            className="action-button"
                                            type="button"
                                        >
                                            Copy Strategy
                                        </button>
                                    </div>
                                </div>

                                <div className="subscription-option highlight">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-semibold">Yearly</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    RM {strategy.pricing.yearly.toFixed(2)}<span className="text-sm text-gray-500">/yr</span>
                                                </span>
                                                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                    Save 20%
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log('Yearly button clicked');
                                                handleCopyStrategy(strategy, 'yearly');
                                            }}
                                            className="action-button highlight"
                                            type="button"
                                        >
                                            Copy Strategy
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Why this matches:</h4>
                                <div className="match-reasons-list">
                                    {matchReasons.map((reason, reasonIndex) => (
                                        <div 
                                            key={reasonIndex} 
                                            className="match-reason"
                                            style={{ '--animation-order': reasonIndex } as React.CSSProperties}
                                        >
                                            <div className="match-reason-dot" />
                                            <span className="text-gray-600">{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}; 