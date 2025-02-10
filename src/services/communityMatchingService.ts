import { HuggingFaceAPI } from './ai/huggingface';
import { Community, UserProfile, CommunityMatch } from '../types/community';

export class CommunityMatcher {
    private huggingFace: HuggingFaceAPI;

    constructor() {
        this.huggingFace = new HuggingFaceAPI();
    }

    async findMatchingCommunities(
        userProfile: UserProfile,
        communities: Community[],
        existingUsers: UserProfile[]
    ): Promise<CommunityMatch[]> {
        try {
            const userDescription = this.createUserDescription(userProfile);
            const communityDescriptions = communities.map(community => 
                this.createCommunityDescription(community)
            );

            const similarities = await this.huggingFace.getSimilarities(
                userDescription,
                communityDescriptions
            );

            return communities.map((community, index) => ({
                community,
                matchScore: similarities[index],
                matchReasons: this.generateMatchReasons(userProfile, community),
                similarMembers: this.findSimilarMembers(userProfile, existingUsers, community)
            }));
        } catch (error) {
            console.error('Error in community matching:', error);
            return this.fallbackMatching(userProfile, communities, existingUsers);
        }
    }

    private createUserDescription(profile: UserProfile): string {
        return `Trader with ${profile.experience.level} experience, interested in ${profile.tradingStyles.join(', ')} 
                trading in ${profile.preferredMarkets.join(', ')}. Uses ${profile.analysisPreferences.join(', ')} 
                with ${profile.riskTolerance} risk tolerance.`;
    }

    private createCommunityDescription(community: Community): string {
        return `${community.name}: ${community.description}. For ${community.experienceLevel} traders, 
                focused on ${community.tradingStyles.join(', ')} in ${community.preferredMarkets.join(', ')}.`;
    }

    private generateMatchReasons(profile: UserProfile, community: Community): string[] {
        const reasons: string[] = [];

        if (profile.experience.level === community.experienceLevel) {
            reasons.push('Matching experience level');
        }

        const matchingStyles = profile.tradingStyles.filter(style => 
            community.tradingStyles.includes(style)
        );
        if (matchingStyles.length > 0) {
            reasons.push(`Similar trading styles: ${matchingStyles.join(', ')}`);
        }

        const matchingMarkets = profile.preferredMarkets.filter(market => 
            community.preferredMarkets.includes(market)
        );
        if (matchingMarkets.length > 0) {
            reasons.push(`Common markets: ${matchingMarkets.join(', ')}`);
        }

        return reasons;
    }

    private findSimilarMembers(
        profile: UserProfile,
        existingUsers: UserProfile[],
        community: Community
    ): UserProfile[] {
        // In a real app, implement similarity scoring between users
        return existingUsers.slice(0, 3);
    }

    private fallbackMatching(
        profile: UserProfile,
        communities: Community[],
        existingUsers: UserProfile[]
    ): CommunityMatch[] {
        return communities.map(community => ({
            community,
            matchScore: this.calculateBasicMatchScore(profile, community),
            matchReasons: this.generateMatchReasons(profile, community),
            similarMembers: this.findSimilarMembers(profile, existingUsers, community)
        }));
    }

    private calculateBasicMatchScore(profile: UserProfile, community: Community): number {
        let score = 0;
        
        // Experience level match
        if (profile.experience.level === community.experienceLevel) {
            score += 0.3;
        }

        // Trading styles match
        const styleMatch = profile.tradingStyles.some(style => 
            community.tradingStyles.includes(style)
        );
        if (styleMatch) score += 0.4;

        // Markets match
        const marketMatch = profile.preferredMarkets.some(market => 
            community.preferredMarkets.includes(market)
        );
        if (marketMatch) score += 0.3;

        return score;
    }
} 