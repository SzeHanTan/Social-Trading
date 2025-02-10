import React, { useEffect } from 'react';
import { CommunityProfileForm } from './CommunityProfileForm';
import { UserProfile } from '../types/community';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (profile: UserProfile) => Promise<void>;
    loading: boolean;
}

export const ProfileModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, loading }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const onSubmitHandler = async (profile: UserProfile) => {
        try {
            await onSubmit(profile);
            return Promise.resolve();
        } catch (error) {
            console.error('Error submitting profile:', error);
            throw error;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="modal-backdrop"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            />
            
            {/* Modal Container */}
            <div className="modal-container">
                {/* Modal Content */}
                <div className="modal-content">
                    {/* Header */}
                    <div className="modal-header">
                        <h2 className="text-xl font-semibold text-white">
                            Complete Your Trading Profile
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form Container */}
                    <div className="form-container">
                        <div className="mb-4 text-gray-600">
                            Please complete your profile to find the best trading communities for you.
                        </div>
                        <CommunityProfileForm 
                            onSubmit={onSubmitHandler}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}; 