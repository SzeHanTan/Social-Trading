import React from 'react';
import { StrategyMatchingForm } from '../components/StrategyMatchingForm';

const StrategyMatchingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Find Your Trading Strategy</h1>
                <StrategyMatchingForm />
            </div>
        </div>
    );
};

export default StrategyMatchingPage; 