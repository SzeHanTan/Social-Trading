import type { Strategy } from '../types/strategy';

export const mockStrategies: Strategy[] = [
    {
        id: '1',
        name: 'Conservative Growth Strategy',
        type: 'Position Trading',
        sectors: ['Finance', 'Consumer Goods'],
        description: 'A low-risk strategy focusing on stable blue-chip stocks with consistent dividends.',
        performance: {
            winRate: 75,
            averageReturn: 12,
            sharpeRatio: 1.8,
            maxDrawdown: 15
        },
        requirements: {
            minCapital: 10000,
            riskLevel: 2,
            experienceLevel: 'Beginner'
        },
        provider: {
            id: 'p1',
            name: 'John Smith',
            experience: 15,
            totalFollowers: 5000
        },
        pricing: {
            monthly: 899.99,
            yearly: 8999.99
        }
    },
    {
        id: '2',
        name: 'Tech Momentum Strategy',
        type: 'Swing Trading',
        sectors: ['Technology'],
        description: 'Capitalizes on momentum in high-growth tech stocks.',
        performance: {
            winRate: 65,
            averageReturn: 25,
            sharpeRatio: 1.5,
            maxDrawdown: 25
        },
        requirements: {
            minCapital: 25000,
            riskLevel: 4,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p2',
            name: 'Sarah Chen',
            experience: 8,
            totalFollowers: 3200
        },
        pricing: {
            monthly: 449.99,
            yearly: 4499.99
        }
    },
    {
        id: '3',
        name: 'Healthcare Value Strategy',
        type: 'Position Trading',
        sectors: ['Healthcare'],
        description: 'Long-term value investing in established healthcare companies.',
        performance: {
            winRate: 70,
            averageReturn: 15,
            sharpeRatio: 1.6,
            maxDrawdown: 18
        },
        requirements: {
            minCapital: 15000,
            riskLevel: 3,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p3',
            name: 'Emily Johnson',
            experience: 12,
            totalFollowers: 4200
        },
        pricing: {
            monthly: 6999.99,
            yearly: 6999.99
        }
    },
    {
        id: '4',
        name: 'Energy Day Trading',
        type: 'Day Trading',
        sectors: ['Energy'],
        description: 'Active day trading in energy sector stocks and ETFs.',
        performance: {
            winRate: 62,
            averageReturn: 35,
            sharpeRatio: 1.4,
            maxDrawdown: 30
        },
        requirements: {
            minCapital: 50000,
            riskLevel: 5,
            experienceLevel: 'Advanced'
        },
        provider: {
            id: 'p4',
            name: 'Mike Wilson',
            experience: 10,
            totalFollowers: 2800
        },
        pricing: {
            monthly: 599.99,
            yearly: 5999.99
        }
    },
    {
        id: '5',
        name: 'Global Macro Strategy',
        type: 'Swing Trading',
        sectors: ['Finance', 'Technology', 'Consumer Goods'],
        description: 'Multi-sector approach focusing on global economic trends.',
        performance: {
            winRate: 68,
            averageReturn: 20,
            sharpeRatio: 1.7,
            maxDrawdown: 22
        },
        requirements: {
            minCapital: 30000,
            riskLevel: 4,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p5',
            name: 'Alex Zhang',
            experience: 14,
            totalFollowers: 4800
        },
        pricing: {
            monthly: 899.99,
            yearly: 8999.99
        }
    },
    {
        id: '6',
        name: 'Small Cap Growth',
        type: 'Swing Trading',
        sectors: ['Technology', 'Healthcare', 'Consumer Goods'],
        description: 'Focus on high-growth small-cap companies with strong potential.',
        performance: {
            winRate: 58,
            averageReturn: 40,
            sharpeRatio: 1.3,
            maxDrawdown: 35
        },
        requirements: {
            minCapital: 20000,
            riskLevel: 5,
            experienceLevel: 'Advanced'
        },
        provider: {
            id: 'p6',
            name: 'Rachel Kim',
            experience: 7,
            totalFollowers: 2100
        },
        pricing: {
            monthly: 599.99,
            yearly: 5999.99
        }
    },
    {
        id: '7',
        name: 'Dividend Income',
        type: 'Position Trading',
        sectors: ['Finance', 'Consumer Goods', 'Energy'],
        description: 'Focus on high-dividend yield stocks with stable income.',
        performance: {
            winRate: 82,
            averageReturn: 10,
            sharpeRatio: 2.0,
            maxDrawdown: 12
        },
        requirements: {
            minCapital: 15000,
            riskLevel: 1,
            experienceLevel: 'Beginner'
        },
        provider: {
            id: 'p7',
            name: 'David Miller',
            experience: 20,
            totalFollowers: 6500
        },
        pricing: {
            monthly: 344.99,
            yearly: 3444.99
        }
    },
    {
        id: '8',
        name: 'Value Investing Pro',
        type: 'Value',
        sectors: ['Finance', 'Consumer Goods'],
        description: 'Long-term value investing strategy focusing on undervalued companies',
        performance: {
            winRate: 70,
            averageReturn: 15,
            sharpeRatio: 1.6,
            maxDrawdown: 18
        },
        requirements: {
            minCapital: 15000,
            riskLevel: 3,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p8',
            name: 'Emily Johnson',
            experience: 12,
            totalFollowers: 4200
        },
        pricing: {
            monthly: 599.99,
            yearly: 5999.99
        }
    },
    {
        id: '9',
        name: 'Healthcare Growth Strategy',
        type: 'Growth',
        sectors: ['Healthcare', 'Biotech'],
        description: 'Growth-focused strategy targeting healthcare and biotech sectors',
        performance: {
            winRate: 70,
            averageReturn: 15,
            sharpeRatio: 1.6,
            maxDrawdown: 18
        },
        requirements: {
            minCapital: 15000,
            riskLevel: 3,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p9',
            name: 'Emily Johnson',
            experience: 12,
            totalFollowers: 4200
        },
        pricing: {
            monthly: 799.99,
            yearly: 7999.99
        }
    },
    {
        id: '10',
        name: 'Global Macro Elite',
        type: 'Macro',
        sectors: ['Global Markets', 'Forex'],
        description: 'Advanced macro strategy focusing on global market trends',
        performance: {
            winRate: 68,
            averageReturn: 20,
            sharpeRatio: 1.7,
            maxDrawdown: 22
        },
        requirements: {
            minCapital: 30000,
            riskLevel: 4,
            experienceLevel: 'Intermediate'
        },
        provider: {
            id: 'p10',
            name: 'Alex Zhang',
            experience: 14,
            totalFollowers: 4800
        },
        pricing: {
            monthly: 999.99,
            yearly: 9999.99
        }
    }
]; 