export interface Community {
    id: string;
    name: string;
    description: string;
    topics: string[];
    experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    tradingStyles: string[];
    preferredMarkets: string[];
    memberCount: number;
    activeLevel: number; // 1-5 scale of how active the community is
    languages: string[];
    profile: UserProfile;
}

export interface UserProfile {
    id: string;
    name: string;
    experience: {
        level: 'Beginner' | 'Intermediate' | 'Advanced';
        years: number;
    };
    interests: string[];
    tradingStyles: string[];
    preferredMarkets: string[];
    languages: string[];
    activeHours: string[];
    bio: string;
    analysisPreferences: string[];
    riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
    averagePosition: {
        size: number;
        duration: 'day' | 'week' | 'month';
    };
    preferredTimeZone: string;
    learningGoals: string[];
    tradingFrequency: 'daily' | 'weekly' | 'monthly';
    technicalIndicators: string[];
    successMetrics: string[];
    tradingStyle: string;
    experienceLevel: string;
    riskToleranceLevel: string;
}

export interface CommunityMatch {
    community: Community;
    matchScore: number;
    matchReasons: string[];
}

export function createUserProfile(data: Partial<UserProfile>): UserProfile {
    return {
        id: data.id || '',
        name: data.name || '',
        experience: data.experience || { level: 'Beginner', years: 0 },
        interests: data.interests || [],
        tradingStyles: data.tradingStyles || [],
        preferredMarkets: data.preferredMarkets || [],
        languages: data.languages || [],
        activeHours: data.activeHours || [],
        bio: data.bio || '',
        analysisPreferences: data.analysisPreferences || [],
        riskTolerance: data.riskTolerance || 'Moderate',
        averagePosition: data.averagePosition || { size: 0, duration: 'day' },
        preferredTimeZone: data.preferredTimeZone || '',
        learningGoals: data.learningGoals || [],
        tradingFrequency: data.tradingFrequency || 'daily',
        technicalIndicators: data.technicalIndicators || [],
        successMetrics: data.successMetrics || [],
        tradingStyle: data.tradingStyle || '',
        experienceLevel: data.experienceLevel || '',
        riskToleranceLevel: data.riskToleranceLevel || ''
    };
} 