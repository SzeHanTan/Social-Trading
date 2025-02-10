import React from 'react';
import { CommunityMatchingTest } from '../components/CommunityMatchingTest';
import { StrategyMatchingTest } from '../components/StrategyMatchingTest';

const TestPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Test Page</h1>
            
            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Community Matching Test</h2>
                    <CommunityMatchingTest />
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Strategy Matching Test</h2>
                    <StrategyMatchingTest />
                </section>
            </div>
        </div>
    );
};

export default TestPage; 