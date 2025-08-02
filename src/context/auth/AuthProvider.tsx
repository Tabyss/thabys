'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextProps {
    authenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const LOCAL_KEY = 'admin_token';
const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_KEY);
        if (token === btoa(PASSWORD || '')) {
            setAuthenticated(true);
        }
    }, []);

    const login = (password: string): boolean => {
        if (password === PASSWORD) {
            localStorage.setItem(LOCAL_KEY, btoa(password));
            setAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(LOCAL_KEY);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
