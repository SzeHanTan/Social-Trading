import React, { useState } from 'react';
import { StrategyMatcher } from '../services/ai/strategyMatchingService';
import { mockStrategies } from '../data/mockStrategies';
import type { UserPreferences } from '../types/user';
import '../styles/StrategyMatching.css';

const sectors = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer Goods', 'Communication'];
const tradingStyles = ['Day Trading', 'Swing Trading', 'Position Trading'];
const investmentGoals = ['Growth', 'Income', 'Capital Preservation', 'Speculation'];

// Add this at the top of the file for fade-in animation
const fadeInAnimation = "animate-[fadeIn_0.3s_ease-in-out]";
const slideUpAnimation = "animate-[slideUp_0.4s_ease-out]";
const scaleAnimation = "animate-[scale_0.2s_ease-out]";

// Add these keyframes to your CSS
const styles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes scale {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
}
`;

export const StrategyMatchingTest: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preferences, setPreferences] = useState<UserPreferences>({
        preferredSectors: ['Technology', 'Finance'],
        riskTolerance: 3,
        tradingStyle: ['Swing Trading'],
        investmentGoals: ['Growth'],
        preferredHoldingPeriod: 'medium'
    });

    const handleTest = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default behavior
        e.preventDefault();
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setLoading(true);
        setError(null);
        
        try {
            const matcher = new StrategyMatcher();
            const matches = await matcher.findMatchingStrategies(preferences, mockStrategies);
            setResults(matches);
            
            // Scroll to results smoothly after they're loaded
            setTimeout(() => {
                const resultsElement = document.querySelector('.results-container');
                if (resultsElement) {
                    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error finding matches:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add style tag for animations
    React.useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => styleSheet.remove();
    }, []);

    return (
        <div className="strategy-matching">
            <div className="strategy-card">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2 className="section-title">Strategy Matching</h2>
                    
                    <div className="form-section">
                        <h3 className="section-title">Investment Goals</h3>
                        <div className="checkbox-group">
                            {investmentGoals.map(goal => (
                                <label key={goal} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={preferences.investmentGoals.includes(goal)}
                                        onChange={(e) => {
                                            const newGoals = e.target.checked
                                                ? [...preferences.investmentGoals, goal]
                                                : preferences.investmentGoals.filter(g => g !== goal);
                                            setPreferences({ ...preferences, investmentGoals: newGoals });
                                        }}
                                    />
                                    {goal}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Trading Style</h3>
                        <div className="checkbox-group">
                            {tradingStyles.map(style => (
                                <label key={style} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={preferences.tradingStyle.includes(style)}
                                        onChange={(e) => {
                                            const newStyles = e.target.checked
                                                ? [...preferences.tradingStyle, style]
                                                : preferences.tradingStyle.filter(s => s !== style);
                                            setPreferences({ ...preferences, tradingStyle: newStyles });
                                        }}
                                    />
                                    {style}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Preferred Sectors</h3>
                        <div className="checkbox-group">
                            {sectors.map(sector => (
                                <label key={sector} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={preferences.preferredSectors.includes(sector)}
                                        onChange={(e) => {
                                            const newSectors = e.target.checked
                                                ? [...preferences.preferredSectors, sector]
                                                : preferences.preferredSectors.filter(s => s !== sector);
                                            setPreferences({ ...preferences, preferredSectors: newSectors });
                                        }}
                                    />
                                    {sector}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Risk Tolerance</h3>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={preferences.riskTolerance}
                                onChange={(e) => setPreferences({ ...preferences, riskTolerance: parseInt(e.target.value) })}
                                className="slider"
                            />
                            <div className="text-center mt-2">
                                Level: {preferences.riskTolerance}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="button"
                        className="action-button"
                        onClick={handleTest}
                        disabled={loading}
                    >
                        {loading ? 'Finding Matches...' : 'Find Matching Strategies'}
                    </button>

                    {loading && (
                        <div className="loading-container">
                            <div className="loading-spinner" />
                            <p className="text-center text-gray-600">Finding your perfect match...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-message bg-red-50 text-red-600 p-4 rounded-lg mt-4">
                            {error}
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="results-container" id="results">
                            <h3 className="section-title">Matching Strategies</h3>
                            {results.map((match, index) => (
                                <div key={index} className="match-item fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="match-score">
                                        {(match.score * 100).toFixed(1)}% Match
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2">{match.strategy.name}</h4>
                                    <p className="text-gray-600 mb-4">{match.strategy.description}</p>
                                    <div className="match-reasons-list">
                                        {match.reasons.map((reason: string, i: number) => (
                                            <div key={i} className="match-reason">
                                                <div className="match-reason-dot" />
                                                <span>{reason}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}; 