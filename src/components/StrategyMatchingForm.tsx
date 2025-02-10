import React, { useState } from 'react';
import { StrategyMatcher } from '../services/ai/strategyMatchingService';
import { mockStrategies } from '../data/mockStrategies';
import type { Strategy, StrategyMatch } from '../types/strategy';
import { StrategyMatches } from './StrategyMatches';

const sectors = ['Healthcare', 'Technology', 'Finance', 'Energy', 'Consumer Goods'];
const tradingTypes = ['Day Trading', 'Swing Trading', 'Position Trading', 'Algorithmic'];
const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];

export const StrategyMatchingForm: React.FC = () => {
    const [preferences, setPreferences] = useState({
        preferredSectors: [] as string[],
        riskTolerance: 3,
        tradingStyle: [] as string[],
        investmentGoals: ['Growth', 'Income'] as string[],
        preferredHoldingPeriod: 'medium'
    });

    const [matches, setMatches] = useState<StrategyMatch[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const matcher = new StrategyMatcher();
            const rawResults = await matcher.findMatchingStrategies(preferences, mockStrategies);
            // Transform the results to match the StrategyMatch interface
            const formattedMatches: StrategyMatch[] = rawResults.map(result => ({
                strategy: result.strategy,
                matchScore: result.matchScore,  // Changed from score
                matchReasons: result.matchReasons  // Changed from reasons
            }));
            setMatches(formattedMatches);
        } catch (error: any) {
            console.error('Error matching strategies:', error);
            setError(error.message || 'Failed to find matching strategies');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyStrategy = async (strategy: Strategy, subscription: 'monthly' | 'yearly') => {
        try {
            // Add immediate feedback
            console.log('Copy strategy clicked:', strategy.name, subscription);
            
            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Return success
            return Promise.resolve();
        } catch (error) {
            console.error('Error copying strategy:', error);
            throw error;
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="space-y-8">
                    {/* Sectors Section */}
                    <div className="form-section">
                        <h3 className="section-title">Select Sectors</h3>
                        <div className="checkbox-group">
                            {sectors.map(sector => (
                                <label key={sector} className="checkbox-item">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={preferences.preferredSectors.includes(sector)}
                                            onChange={(e) => {
                                                const newSectors = e.target.checked
                                                    ? [...preferences.preferredSectors, sector]
                                                    : preferences.preferredSectors.filter(s => s !== sector);
                                                setPreferences({...preferences, preferredSectors: newSectors});
                                            }}
                                            className="form-checkbox"
                                        />
                                        <span className="text-gray-700 font-medium">{sector}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Trading Style Section */}
                    <div className="form-section">
                        <h3 className="section-title">Trading Style</h3>
                        <div className="checkbox-group">
                            {tradingTypes.map(style => (
                                <label key={style} className="checkbox-item">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={preferences.tradingStyle.includes(style)}
                                            onChange={(e) => {
                                                const newStyles = e.target.checked
                                                    ? [...preferences.tradingStyle, style]
                                                    : preferences.tradingStyle.filter(s => s !== style);
                                                setPreferences({...preferences, tradingStyle: newStyles});
                                            }}
                                            className="form-checkbox"
                                        />
                                        <span className="text-gray-700 font-medium">{style}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Risk Tolerance Section */}
                    <div className="form-section">
                        <h3 className="section-title">Risk Tolerance</h3>
                        <div className="slider-container">
                            <div className="flex justify-between mb-4">
                                <span className="text-sm font-medium text-gray-500">Conservative</span>
                                <span className="text-sm font-medium text-gray-500">Aggressive</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={preferences.riskTolerance}
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    riskTolerance: parseInt(e.target.value)
                                })}
                                className="slider"
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-400">Lower Risk</span>
                                <span className="text-xs text-gray-400">Higher Return</span>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || preferences.preferredSectors.length === 0}
                    className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                        text-white py-4 px-6 rounded-xl font-semibold 
                        hover:from-blue-700 hover:to-indigo-700 
                        disabled:from-gray-400 disabled:to-gray-400
                        transform transition-all duration-300
                        hover:scale-[1.02] hover:shadow-lg
                        disabled:hover:scale-100 disabled:hover:shadow-none
                        disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Finding Matches...
                        </span>
                    ) : 'Find Matching Strategies'}
                </button>
            </form>

            {matches.length > 0 && (
                <div className="mt-8">
                    <StrategyMatches 
                        matches={matches}
                        onCopyStrategy={handleCopyStrategy}
                    />
                </div>
            )}
        </div>
    );
}; 