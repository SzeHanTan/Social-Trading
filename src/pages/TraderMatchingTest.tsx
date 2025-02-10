import React, { useState } from 'react';
import { TraderMatchingForm } from '../components/TraderMatchingForm';
import { mockTraders } from '../data/mockTraders';
import type { TraderProfile } from '../types/trader';
import '../styles/TraderMatchingTest.css';

const TraderMatchingTest: React.FC = () => {
    const [selectedTrader, setSelectedTrader] = useState<TraderProfile | null>(null);

    return (
        <div className="trader-matching-test">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Find Your Trading Mentor</h1>
                    <p className="text-gray-600">
                        Select your preferences to find traders that match your trading style and interests.
                    </p>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <TraderMatchingForm />
                </div>

                {/* Available Traders Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Available Traders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockTraders.map(trader => (
                            <div 
                                key={trader.id}
                                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => setSelectedTrader(trader)}
                            >
                                <h3 className="text-xl font-bold mb-2">{trader.name}</h3>
                                <div className="text-gray-600">
                                    <p>Sectors: {trader.sectors.join(', ')}</p>
                                    <p>Style: {trader.tradingStyle.join(', ')}</p>
                                    <p className="text-green-600 font-semibold">
                                        Win Rate: {trader.performanceMetrics.winRate}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Trader Details */}
                {selectedTrader && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">{selectedTrader.name}</h2>
                                <button 
                                    onClick={() => setSelectedTrader(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Sectors</h3>
                                    <p>{selectedTrader.sectors.join(', ')}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Trading Style</h3>
                                    <p>{selectedTrader.tradingStyle.join(', ')}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Performance</h3>
                                    <p>Win Rate: {selectedTrader.performanceMetrics.winRate}%</p>
                                    <p>Avg Return: {selectedTrader.performanceMetrics.averageReturn}%</p>
                                    <p>Profit Factor: {selectedTrader.performanceMetrics.profitFactor}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Trading Details</h3>
                                    <p>Risk Level: {selectedTrader.riskLevel}/5</p>
                                    <p>Holding Period: {selectedTrader.averageHoldingPeriod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TraderMatchingTest; 