import React from 'react';

interface Props {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const Notification: React.FC<Props> = ({ message, type, onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`
            fixed top-4 right-4 p-4 rounded-lg shadow-xl
            flex items-center gap-3 min-w-[300px]
            ${type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }
            z-[9999] notification-slide-in
            transform-gpu
        `}
        style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
        }}
        >
            {type === 'success' ? (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
            <p className="font-medium flex-1">{message}</p>
            <button 
                onClick={onClose}
                className="p-1 hover:opacity-80 transition-opacity"
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}; 