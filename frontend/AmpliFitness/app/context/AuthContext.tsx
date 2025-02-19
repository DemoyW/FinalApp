import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null};
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;

}

const TOKEN_KEY = 'my-jwt-token';
const API_URL = 'http://localhost:3000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null 
    }>({
        token: null,
        authenticated: null,
    });


    const value = {};
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}