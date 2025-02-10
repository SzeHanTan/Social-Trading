import axios from 'axios';
import type { TraderProfile, TradingRecord } from '../../types/trader';

export interface MatchResult {
    trader: TraderProfile;
    matchScore: number;
    matchReasons: string[];
}

export interface UserPreferences {
    sectors: string[];
    riskTolerance: number;      // 1-5 scale
    investmentStyle: string[];  // e.g., ['long-term', 'value']
    preferredHoldingPeriod: string;
}

// Option 1: Using Hugging Face's all-MiniLM-L6-v2 for semantic matching
const HUGGING_FACE_MODEL = "sentence-transformers/all-MiniLM-L6-v2";

// This model is good for:
// - Understanding trading style similarities
// - Matching sector preferences
// - Understanding risk profiles

export async function findMatchingTraders(
    userPreferences: UserPreferences,
    traders: TraderProfile[]
): Promise<MatchResult[]> {
    try {
        // For testing, return simple matches based on sector overlap
        return traders.map(trader => {
            const commonSectors = trader.sectors.filter(s => 
                userPreferences.sectors.includes(s)
            );
            
            const matchScore = commonSectors.length / 
                Math.max(userPreferences.sectors.length, trader.sectors.length);

            const reasons = [];
            if (commonSectors.length > 0) {
                reasons.push(`Matches ${commonSectors.length} of your preferred sectors`);
            }
            if (Math.abs(trader.riskLevel - userPreferences.riskTolerance) <= 1) {
                reasons.push('Similar risk tolerance');
            }
            if (trader.averageHoldingPeriod === userPreferences.preferredHoldingPeriod) {
                reasons.push('Matching trading timeframe');
            }

            return {
                trader,
                matchScore: matchScore,
                matchReasons: reasons.length > 0 ? reasons : ['General match based on profile']
            };
        }).sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
        console.error('Error in trader matching:', error);
        throw new Error('Failed to process trader matching');
    }
}

async function getEmbedding(text: string) {
    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HUGGING_FACE_MODEL}`,
        { inputs: text },
        {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}

function formatPreferences(prefs: UserPreferences): string {
    return `Looking for traders in ${prefs.sectors.join(', ')} sectors. 
            Preferred trading style: ${prefs.investmentStyle.join(', ')}. 
            Risk tolerance: ${prefs.riskTolerance}/5. 
            Preferred holding period: ${prefs.preferredHoldingPeriod}`;
}

function formatTraderProfile(trader: TraderProfile): string {
    return `Experienced trader in ${trader.sectors.join(', ')}. 
            Trading style: ${trader.tradingStyle.join(', ')}. 
            Risk level: ${trader.riskLevel}/5. 
            Average holding period: ${trader.averageHoldingPeriod}. 
            Win rate: ${trader.performanceMetrics.winRate}%`;
}

function calculateCosineSimilarity(embedding1: number[], embedding2: number[]): number {
    // Calculate dot product
    const dotProduct = embedding1.reduce((sum, value, i) => sum + value * embedding2[i], 0);
    
    // Calculate magnitudes
    const magnitude1 = Math.sqrt(embedding1.reduce((sum, value) => sum + value * value, 0));
    const magnitude2 = Math.sqrt(embedding2.reduce((sum, value) => sum + value * value, 0));
    
    // Calculate cosine similarity
    return dotProduct / (magnitude1 * magnitude2);
}

function generateMatchReasons(
    prefs: UserPreferences, 
    trader: TraderProfile, 
    similarity: number
): string[] {
    const reasons = [];
    
    // Sector match
    const commonSectors = prefs.sectors.filter(s => trader.sectors.includes(s));
    if (commonSectors.length > 0) {
        reasons.push(`Specializes in your preferred sectors: ${commonSectors.join(', ')}`);
    }

    // Risk match
    if (Math.abs(prefs.riskTolerance - trader.riskLevel) <= 1) {
        reasons.push('Similar risk tolerance level');
    }

    // Performance
    if (trader.performanceMetrics.winRate > 60) {
        reasons.push(`Strong track record with ${trader.performanceMetrics.winRate}% win rate`);
    }

    return reasons;
}

function summarizeTradingHistory(history: TradingRecord[]) {
    // Calculate relevant metrics for the AI model
    return {
        sectorPerformance: calculateSectorPerformance(history),
        consistencyScore: calculateConsistency(history),
        riskMetrics: calculateRiskMetrics(history)
    };
}

interface SectorPerformance {
    sector: string;
    winRate: number;
    averageReturn: number;
}

function calculateSectorPerformance(history: TradingRecord[]): SectorPerformance[] {
    const sectorMap = new Map<string, { wins: number; total: number; returns: number[] }>();
    
    history.forEach(trade => {
        const current = sectorMap.get(trade.sector) || { wins: 0, total: 0, returns: [] };
        current.total++;
        if (trade.result > 0) current.wins++;
        current.returns.push(trade.result);
        sectorMap.set(trade.sector, current);
    });
    
    return Array.from(sectorMap.entries()).map(([sector, data]) => ({
        sector,
        winRate: (data.wins / data.total) * 100,
        averageReturn: data.returns.reduce((a, b) => a + b, 0) / data.returns.length
    }));
}

function calculateConsistency(history: TradingRecord[]): number {
    if (history.length < 2) return 1;
    
    const returns = history.map(trade => trade.result);
    const stdDev = calculateStandardDeviation(returns);
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    
    // Lower coefficient of variation indicates more consistency
    const coefficientOfVariation = Math.abs(stdDev / mean);
    return 1 / (1 + coefficientOfVariation); // Normalize to 0-1 range
}

function calculateRiskMetrics(history: TradingRecord[]) {
    const returns = history.map(trade => trade.result);
    
    return {
        maxDrawdown: calculateMaxDrawdown(returns),
        sharpeRatio: calculateSharpeRatio(returns),
        volatility: calculateStandardDeviation(returns)
    };
}

// Additional helper functions
function calculateStandardDeviation(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - mean, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / values.length);
}

function calculateMaxDrawdown(returns: number[]): number {
    let maxDrawdown = 0;
    let peak = returns[0];
    
    returns.forEach(value => {
        if (value > peak) {
            peak = value;
        }
        const drawdown = (peak - value) / peak;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
    });
    
    return maxDrawdown;
}

function calculateSharpeRatio(returns: number[], riskFreeRate = 0.02): number {
    const excessReturns = returns.map(r => r - riskFreeRate);
    const meanExcessReturn = excessReturns.reduce((a, b) => a + b, 0) / returns.length;
    const stdDev = calculateStandardDeviation(returns);
    
    return stdDev === 0 ? 0 : meanExcessReturn / stdDev;
} 