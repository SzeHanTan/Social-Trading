import { HuggingFaceAPI } from './huggingface';
import type { Strategy, StrategyMatch } from '../../types/strategy';
import type { UserPreferences } from '../../types/user';
import { HfInference } from '@huggingface/inference';

// Initialize HuggingFace client with Vite environment variable
const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export interface UserProfile {
  experience: string;
  riskTolerance: string;
  goals: string;
  markets: string[];
}

export async function matchTraderStrategy(userProfile: UserProfile) {
  try {
    console.log('Generating strategy for profile:', userProfile);

    const response = await hf.textGeneration({
      model: 'facebook/opt-350m',
      inputs: `Suggest a trading strategy for a trader with:
        Experience Level: ${userProfile.experience}
        Risk Tolerance: ${userProfile.riskTolerance}
        Investment Goals: ${userProfile.goals}
        Preferred Markets: ${userProfile.markets.join(', ')}`,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true
      }
    });

    console.log('AI Response:', response);
    return response.generated_text;
  } catch (error) {
    console.error('Strategy matching error:', error);
    throw new Error('Failed to match strategy');
  }
}

export class StrategyMatcher {
    private huggingFace: HuggingFaceAPI;

    constructor() {
        this.huggingFace = new HuggingFaceAPI();
    }

    async findMatchingStrategies(userPreferences: UserPreferences, strategies: Strategy[]): Promise<StrategyMatch[]> {
        try {
            console.log('Starting strategy matching with preferences:', userPreferences);
            
            const userQuery = this.createUserQuery(userPreferences);
            const strategyDescriptions = strategies.map(strategy => 
                this.createStrategyDescription(strategy)
            );

            console.log('Fetching similarities from HuggingFace...');
            const similarities = await this.huggingFace.getSimilarities(
                userQuery, 
                strategyDescriptions
            );

            console.log('Received similarities:', similarities);

            // Combine AI scores with rule-based scores
            const matches = strategies.map((strategy, index) => {
                const aiScore = similarities[index] || 0;
                const ruleScore = this.calculateRuleBasedScore(userPreferences, strategy);
                const finalScore = this.calculateFinalScore(aiScore, ruleScore);
                
                console.log(`Strategy ${strategy.name}:`, {
                    aiScore,
                    ruleScore,
                    finalScore
                });

                return {
                    strategy,
                    matchScore: finalScore,
                    matchReasons: this.generateMatchReasons(userPreferences, strategy)
                };
            }).sort((a, b) => b.matchScore - a.matchScore);

            console.log('Final matches:', matches);
            return matches;

        } catch (error) {
            console.error('Error in findMatchingStrategies:', error);
            console.log('Falling back to rule-based matching...');
            return this.fallbackMatching(userPreferences, strategies);
        }
    }

    private createUserQuery(preferences: UserPreferences): string {
        return `
            Looking for trading strategies with:
            Sectors: ${preferences.preferredSectors.join(', ')}
            Risk Level: ${preferences.riskTolerance}/5
            Trading Style: ${preferences.tradingStyle.join(', ')}
            Investment Goals: ${preferences.investmentGoals.join(', ')}
        `.trim();
    }

    private createStrategyDescription(strategy: Strategy): string {
        return `
            ${strategy.name}:
            Type: ${strategy.type}
            Sectors: ${strategy.sectors.join(', ')}
            Risk Level: ${strategy.requirements.riskLevel}/5
            Description: ${strategy.description}
            Performance: ${strategy.performance.winRate}% win rate
            Experience Level: ${strategy.requirements.experienceLevel}
        `.trim();
    }

    private calculateFinalScore(aiScore: number, ruleScore: number): number {
        // Combine AI and rule-based scores (70% AI, 30% rules)
        return (aiScore * 0.7) + (ruleScore * 0.3);
    }

    private calculateRuleBasedScore(preferences: UserPreferences, strategy: Strategy): number {
        let score = 0;
        
        // 1. Sector Match (30% of total score)
        const sectorMatch = preferences.preferredSectors.some(sector => 
            strategy.sectors.includes(sector));
        if (sectorMatch) score += 0.3;

        // 2. Risk Tolerance Match (50% of total score)
        const riskDiff = Math.abs(preferences.riskTolerance - strategy.requirements.riskLevel);
        score += (5 - riskDiff) / 10; // Max 0.5 points for risk match

        // 3. Performance Score (20% of total score)
        if (strategy.performance.winRate > 60) score += 0.2;

        // Let's enhance the matching algorithm:
        
        // 4. Trading Style Match (20%)
        if (preferences.tradingStyle.some(style => 
            strategy.type.toLowerCase().includes(style.toLowerCase()))) {
            score += 0.2;
        }

        // 5. Investment Goals Alignment (15%)
        if (preferences.investmentGoals.includes('Growth') && strategy.performance.averageReturn > 20) {
            score += 0.15;
        }

        // 6. Experience Level Consideration (15%)
        const experienceLevels: { [key in 'Beginner' | 'Intermediate' | 'Advanced']: number } = {
            'Beginner': 1,
            'Intermediate': 2,
            'Advanced': 3
        };
        
        const userLevel = 2; // Default to Intermediate
        const strategyLevel = experienceLevels[strategy.requirements.experienceLevel as keyof typeof experienceLevels];
        if (Math.abs(userLevel - strategyLevel) <= 1) {
            score += 0.15;
        }

        // Normalize final score to be between 0 and 1
        return Math.min(1, score);
    }

    private fallbackMatching(preferences: UserPreferences, strategies: Strategy[]): StrategyMatch[] {
        console.log('Using fallback matching mechanism');
        return strategies.map(strategy => ({
            strategy,
            matchScore: this.calculateRuleBasedScore(preferences, strategy),
            matchReasons: this.generateMatchReasons(preferences, strategy)
        })).sort((a, b) => b.matchScore - a.matchScore);
    }

    private generateMatchReasons(preferences: UserPreferences, strategy: Strategy): string[] {
        const reasons: string[] = [];

        // 1. Sector Match Reasons
        const matchingSectors = preferences.preferredSectors.filter(sector => 
            strategy.sectors.includes(sector));
        if (matchingSectors.length > 0) {
            reasons.push(`Matches your preferred sectors: ${matchingSectors.join(', ')}`);
        }

        // 2. Risk Level Match
        const riskDiff = Math.abs(preferences.riskTolerance - strategy.requirements.riskLevel);
        if (riskDiff <= 1) {
            reasons.push(`Risk level aligns with your preferences (Your level: ${preferences.riskTolerance}, Strategy level: ${strategy.requirements.riskLevel})`);
        }

        // 3. Performance Reasons
        if (strategy.performance.winRate > 60) {
            reasons.push(`Strong historical performance with ${strategy.performance.winRate}% win rate`);
        }

        // 4. Trading Style Match
        if (preferences.tradingStyle.some(style => 
            strategy.type.toLowerCase().includes(style.toLowerCase()))) {
            reasons.push(`Matches your preferred trading style: ${strategy.type}`);
        }

        // 5. Investment Goals
        if (preferences.investmentGoals.includes('Growth') && strategy.performance.averageReturn > 20) {
            reasons.push(`High growth potential with ${strategy.performance.averageReturn}% average return`);
        }

        // 6. Provider Experience
        if (strategy.provider.experience > 5) {
            reasons.push(`Experienced provider with ${strategy.provider.experience} years of trading`);
        }

        // 7. Capital Requirements
        if (strategy.requirements.minCapital <= 25000) {
            reasons.push(`Accessible capital requirement: $${strategy.requirements.minCapital.toLocaleString()}`);
        }

        return reasons;
    }
} 