import React, { useState } from 'react';
import { findMatchingTraders } from '../services/ai/traderMatchingService';
import { mockTraders } from '../data/mockTraders';
import type { MatchResult } from '../services/ai/traderMatchingService';
import '../styles/TraderMatchingForm.css';

const sectors = ['Healthcare', 'Technology', 'Finance', 'Energy', 'Consumer Goods'];
const tradingStyles = ['Day Trading', 'Swing Trading', 'Long-term', 'Value'];
const holdingPeriods = ['day', 'week', 'month'];

export const TraderMatchingForm: React.FC = () => {
    const [preferences, setPreferences] = useState({
        sectors: [] as string[],
        riskTolerance: 3,
        investmentStyle: [] as string[],
        preferredHoldingPeriod: 'week'
    });
    const [matches, setMatches] = useState<MatchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (preferences.sectors.length === 0) {
            setError('Please select at least one sector');
            return;
        }
        
        setLoading(true);
        setError('');

        console.log('Current preferences:', preferences);
        console.log('Available traders:', mockTraders);

        try {
            const results = await findMatchingTraders(preferences, mockTraders);
            if (results.length === 0) {
                setError('No matching traders found');
            }
            setMatches(results);
        } catch (error) {
            console.error('Error finding matches:', error);
            setError('Failed to find matching traders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="trader-matching-form">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sectors */}
                <div className="form-section">
                    <h3 className="text-lg font-semibold mb-2">Select Sectors</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {sectors.map(sector => (
                            <label key={sector} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={preferences.sectors.includes(sector)}
                                    onChange={(e) => {
                                        const newSectors = e.target.checked
                                            ? [...preferences.sectors, sector]
                                            : preferences.sectors.filter(s => s !== sector);
                                        setPreferences({...preferences, sectors: newSectors});
                                    }}
                                    className="form-checkbox"
                                />
                                <span>{sector}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Trading Styles */}
                <div className="form-section">
                    <h3 className="text-lg font-semibold mb-2">Trading Style</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {tradingStyles.map(style => (
                            <label key={style} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={preferences.investmentStyle.includes(style)}
                                    onChange={(e) => {
                                        const newStyles = e.target.checked
                                            ? [...preferences.investmentStyle, style]
                                            : preferences.investmentStyle.filter(s => s !== style);
                                        setPreferences({...preferences, investmentStyle: newStyles});
                                    }}
                                    className="form-checkbox"
                                />
                                <span>{style}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Risk Tolerance */}
                <div className="form-section">
                    <h3 className="text-lg font-semibold mb-2">Risk Tolerance</h3>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={preferences.riskTolerance}
                        onChange={(e) => setPreferences({
                            ...preferences,
                            riskTolerance: parseInt(e.target.value)
                        })}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                    </div>
                </div>

                {/* Holding Period */}
                <div className="form-section">
                    <h3 className="text-lg font-semibold mb-2">Preferred Holding Period</h3>
                    <select
                        value={preferences.preferredHoldingPeriod}
                        onChange={(e) => setPreferences({
                            ...preferences,
                            preferredHoldingPeriod: e.target.value
                        })}
                        className="form-select w-full"
                    >
                        {holdingPeriods.map(period => (
                            <option key={period} value={period}>
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading || preferences.sectors.length === 0}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Finding Matches...' : 'Find Matching Traders'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {matches.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Your Matches</h3>
                    {matches.map((match, index) => (
                        <div key={match.trader.id} className="mb-4 p-4 border rounded">
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-semibold">{match.trader.name}</h4>
                                <span className="text-green-600 font-semibold">
                                    {(match.matchScore * 100).toFixed(1)}% Match
                                </span>
                            </div>
                            <p className="text-gray-600">Sectors: {match.trader.sectors.join(', ')}</p>
                            <ul className="mt-2 text-sm text-gray-700">
                                {match.matchReasons.map((reason, i) => (
                                    <li key={i}>• {reason}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 