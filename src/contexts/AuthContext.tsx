import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType } from '../types/user';

interface AuthContextType {
    isAuthenticated: boolean;
    user: {
        id: string;
        email: string;
        name: string;
        userType: UserType;
        hasProfile: boolean;
    } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Set to true for testing
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or session)
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    // Verify token with backend
                    const userData = await verifyToken(token);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Auth token verification failed:', error);
                    localStorage.removeItem('authToken');
                }
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Call your login API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { user, token } = await response.json();
            localStorage.setItem('authToken', token);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Call logout API if needed
            localStorage.removeItem('authToken');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            // Call your registration API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const { user, token } = await response.json();
            localStorage.setItem('authToken', token);
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Helper function to verify JWT token
async function verifyToken(token: string) {
    const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Token verification failed');
    }

    return response.json();
} 