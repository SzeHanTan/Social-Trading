import { TraderProfile } from '../types/trader';

export const mockTraders: TraderProfile[] = [
    {
        id: "1",
        name: "Sarah Chen",
        sectors: ["Healthcare"],
        tradingStyle: ["Swing", "Long-term"],
        riskLevel: 3,
        averageHoldingPeriod: "week",
        performanceMetrics: {
            winRate: 68,
            profitFactor: 2.1,
            averageReturn: 12.5
        },
        specializations: ["Pharmaceuticals", "Medical Devices"],
        tradingHistory: [
            {
                date: "2024-03-15",
                sector: "Healthcare",
                instrument: "PFE",
                type: "buy",
                result: 15.5,
                holdingPeriod: 5
            },
            {
                date: "2024-03-10",
                sector: "Biotech",
                instrument: "MRNA",
                type: "buy",
                result: 8.2,
                holdingPeriod: 3
            }
        ]
    },
    {
        id: "2",
        name: "Michael Rodriguez",
        sectors: ["Technology", "AI"],
        tradingStyle: ["Day Trading"],
        riskLevel: 4,
        averageHoldingPeriod: "day",
        performanceMetrics: {
            winRate: 72,
            profitFactor: 1.8,
            averageReturn: 8.2
        },
        specializations: ["Semiconductors", "Cloud Computing"],
        tradingHistory: [
            {
                date: "2024-03-14",
                sector: "Technology",
                instrument: "NVDA",
                type: "buy",
                result: 12.3,
                holdingPeriod: 1
            }
        ]
    },
    {
        id: "3",
        name: "Emma Thompson",
        sectors: ["Finance", "FinTech"],
        tradingStyle: ["Value", "Long-term"],
        riskLevel: 2,
        averageHoldingPeriod: "month",
        performanceMetrics: {
            winRate: 75,
            profitFactor: 2.5,
            averageReturn: 15.0
        },
        specializations: ["Banking", "Payment Systems"],
        tradingHistory: [
            {
                date: "2024-03-01",
                sector: "Finance",
                instrument: "V",
                type: "buy",
                result: 10.2,
                holdingPeriod: 20
            }
        ]
    }
    // Add more mock traders...
]; 