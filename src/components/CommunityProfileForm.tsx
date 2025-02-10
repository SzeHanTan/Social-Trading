import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, createUserProfile } from '../types/community';
import '../styles/CommunityProfileForm.css';

interface ProfileFormData {
    name: string;
    experienceLevel: string;
    tradingStyles: string[];
    markets: string[];
    riskTolerance: string;
}

interface ProfileFormProps {
    onSubmit: (profile: UserProfile) => Promise<void>;
    loading: boolean;
}

export const CommunityProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, loading }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProfileFormData>({
        name: '',
        experienceLevel: '',
        tradingStyles: [],
        markets: [],
        riskTolerance: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const profile = createUserProfile({
            ...formData,
            id: crypto.randomUUID(),
            tradingStyle: formData.tradingStyles[0],
            experienceLevel: formData.experienceLevel as 'Beginner' | 'Intermediate' | 'Advanced',
            riskTolerance: formData.riskTolerance as 'Conservative' | 'Moderate' | 'Aggressive',
            riskToleranceLevel: formData.riskTolerance
        });
        await onSubmit(profile);
    };

    const handleCheckboxChange = (category: 'tradingStyles' | 'markets', value: string) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    return (
        <div className="profile-form-container">
            <form onSubmit={handleSubmit} className="profile-form">
                <h1 className="form-title">Complete Your Trading Profile</h1>
                <p className="form-description">
                    Please complete your profile to find the best trading communities for you.
                </p>

                <div className="form-section">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-section">
                    <label htmlFor="experienceLevel">Experience Level</label>
                    <select
                        id="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={e => setFormData({...formData, experienceLevel: e.target.value})}
                        className="form-select"
                        required
                    >
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="professional">Professional</option>
                    </select>
                </div>

                <div className="form-section">
                    <label>Trading Styles</label>
                    <div className="checkbox-grid">
                        {[
                            'Day Trading',
                            'Swing Trading',
                            'Position Trading',
                            'Scalping'
                        ].map(style => (
                            <label key={style} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={formData.tradingStyles.includes(style)}
                                    onChange={() => handleCheckboxChange('tradingStyles', style)}
                                    className="checkbox-input"
                                />
                                {style}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <label>Preferred Markets</label>
                    <div className="checkbox-grid">
                        {[
                            'Stocks',
                            'Forex',
                            'Cryptocurrency',
                            'Technology'
                        ].map(market => (
                            <label key={market} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={formData.markets.includes(market)}
                                    onChange={() => handleCheckboxChange('markets', market)}
                                    className="checkbox-input"
                                />
                                {market}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <label htmlFor="riskTolerance">Risk Tolerance</label>
                    <select
                        id="riskTolerance"
                        value={formData.riskTolerance}
                        onChange={e => setFormData({...formData, riskTolerance: e.target.value})}
                        className="form-select"
                        required
                    >
                        <option value="">Select Risk Level</option>
                        <option value="conservative">Conservative</option>
                        <option value="moderate">Moderate</option>
                        <option value="aggressive">Aggressive</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Find Communities
                </button>
            </form>
        </div>
    );
};

export default CommunityProfileForm; 