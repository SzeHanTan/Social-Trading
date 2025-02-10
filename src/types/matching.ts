import { Strategy } from './strategy';

export interface StrategyMatch {
    strategy: Strategy;
    matchScore: number;
    matchReasons: string[];
}

export interface MatchFactors {
    riskAlignment: number;
    styleMatch: number;
    performanceMatch: number;
    experienceMatch: number;
} 