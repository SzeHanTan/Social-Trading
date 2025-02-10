export interface Strategy {
    id: string;
    name: string;
    type: string;
    sectors: string[];
    description: string;
    performance: {
        winRate: number;
        averageReturn: number;
        sharpeRatio: number;
        maxDrawdown: number;
    };
    requirements: {
        minCapital: number;
        riskLevel: number;
        experienceLevel: string;
    };
    provider: {
        id: string;
        name: string;
        experience: number;
        totalFollowers: number;
    };
    pricing: {
        monthly: number;
        yearly: number;
    };
}

export interface StrategyMatch {
    strategy: Strategy;
    matchScore: number;
    matchReasons: string[];
} 