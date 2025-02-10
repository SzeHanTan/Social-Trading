export type UserType = 'strategy_provider' | 'common_user';

export interface BaseUser {
    id: string;
    email: string;
    name: string;
    userType: UserType;
    createdAt: Date;
}

export interface UserPreferences {
    preferredSectors: string[];
    riskTolerance: number;
    tradingStyle: string[];
    investmentGoals: string[];
    preferredHoldingPeriod: string;
}

export interface StrategyProvider extends BaseUser {
    userType: 'strategy_provider';
    strategies: Strategy[];
    performance: PerformanceMetrics;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    specializations: string[];
    experience: number; // years
}

export interface CommonUser extends BaseUser {
    userType: 'common_user';
    preferences: UserPreferences;
    followedStrategies: string[]; // strategy IDs
} 