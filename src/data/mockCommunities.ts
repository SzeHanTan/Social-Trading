import { Community } from '../types/community';

export const mockCommunities: Community[] = [
    {
        id: '1',
        name: 'Technical Analysis Masters',
        description: 'A community focused on advanced technical analysis and chart patterns',
        topics: ['Technical Analysis', 'Chart Patterns', 'Indicators'],
        experienceLevel: 'Intermediate',
        tradingStyles: ['Day Trading', 'Swing Trading'],
        preferredMarkets: ['Stocks', 'Forex'],
        memberCount: 1200,
        activeLevel: 5,
        languages: ['English']
    },
    {
        id: '2',
        name: 'Crypto Traders Hub',
        description: 'Cryptocurrency trading discussions and market analysis',
        topics: ['Cryptocurrency', 'Blockchain', 'DeFi'],
        experienceLevel: 'Beginner',
        tradingStyles: ['Day Trading', 'Position Trading'],
        preferredMarkets: ['Cryptocurrency'],
        memberCount: 3500,
        activeLevel: 4,
        languages: ['English', 'Spanish']
    },
    {
        id: '3',
        name: 'Options Strategy Group',
        description: 'Advanced options trading strategies and risk management',
        topics: ['Options', 'Greeks', 'Risk Management'],
        experienceLevel: 'Advanced',
        tradingStyles: ['Options Trading'],
        preferredMarkets: ['Options', 'Stocks'],
        memberCount: 800,
        activeLevel: 4,
        languages: ['English']
    },
    {
        id: '4',
        name: 'Forex Trading Network',
        description: 'Global forex trading community with 24/7 market coverage',
        topics: ['Forex', 'Currency Pairs', 'Economic Calendar'],
        experienceLevel: 'Intermediate',
        tradingStyles: ['Scalping', 'Day Trading'],
        preferredMarkets: ['Forex'],
        memberCount: 2500,
        activeLevel: 5,
        languages: ['English', 'Chinese', 'Japanese']
    },
    {
        id: '5',
        name: 'Algo Trading Lab',
        description: 'Algorithmic trading strategies and automation',
        topics: ['Algorithmic Trading', 'Programming', 'Backtesting'],
        experienceLevel: 'Advanced',
        tradingStyles: ['Algorithmic Trading'],
        preferredMarkets: ['Stocks', 'Futures', 'Crypto'],
        memberCount: 600,
        activeLevel: 3,
        languages: ['English']
    }
]; 