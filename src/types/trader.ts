export interface TraderProfile {
    id: string;
    name: string;
    sectors: string[];           // e.g., ['healthcare', 'tech']
    tradingStyle: string[];      // e.g., ['swing', 'long-term']
    riskLevel: number;          // 1-5 scale
    averageHoldingPeriod: string; // e.g., 'day', 'week', 'month'
    performanceMetrics: {
        winRate: number;
        profitFactor: number;
        averageReturn: number;
    };
    specializations: string[];   // e.g., ['biotech', 'pharmaceuticals']
    tradingHistory: TradingRecord[];
}

export interface TradingRecord {
    date: string;
    sector: string;
    instrument: string;
    type: 'buy' | 'sell';
    result: number;             // percentage gain/loss
    holdingPeriod: number;      // in days
} 