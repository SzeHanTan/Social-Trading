import React, { useState } from 'react';
import { analyzeTradingPost } from '../services/ai/modelService';
import '../styles/SentimentAnalyzer.css';

interface SentimentResult {
    label: string;
    score: number;
}

const SentimentAnalyzer: React.FC = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            setError('');
            const analysis = await analyzeTradingPost(text);
            setResult(analysis.sentiment);
        } catch (err) {
            setError('Failed to analyze sentiment');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sentiment-analyzer">
            <h2>Trading Sentiment Analysis</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter trading-related text to analyze..."
                rows={4}
                className="w-full p-2 border rounded"
            />
            <button 
                onClick={handleAnalyze}
                disabled={loading || !text}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {loading ? 'Analyzing...' : 'Analyze Sentiment'}
            </button>

            {error && <div className="text-red-500 mt-2">{error}</div>}

            {result && (
                <div className="mt-4">
                    <h3>Analysis Results:</h3>
                    <div className="mt-2">
                        <p>Sentiment: {result.label}</p>
                        <p>Confidence: {(result.score * 100).toFixed(2)}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SentimentAnalyzer; 