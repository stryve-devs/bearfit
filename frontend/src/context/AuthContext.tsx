import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../api/services/auth.service';
import type { User, LoginRequest, RegisterRequest } from '../types/auth.types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        console.log('🔍 Loading user...');
        try {
            const storedUser = await authService.getUser();
            console.log('✅ User loaded:', storedUser);
            setUser(storedUser);
        } catch (error) {
            console.log('❌ Error loading user:', error);
        } finally {
            console.log('✅ Setting loading to false');
            setLoading(false);
        }
    };

    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials);
        setUser(response.user);
    };

    const register = async (data: RegisterRequest) => {
        const response = await authService.register(data);
        setUser(response.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    console.log('🎯 AuthContext state:', { loading, isAuthenticated: !!user });

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};