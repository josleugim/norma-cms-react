import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { logout } from '../api/auth';
import { getActiveMembership, getUserMe } from '../api/user';
import { RestrictedAccessError } from '../errors/RestrictedAccessError';
import type { Membership, Organization, UserMe } from '../types';

const SESSION_FLAG_KEY = 'hasSession';

type AuthContextValue = {
    user: UserMe | null;
    membership: Membership | null;
    organization: Organization | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshSession: () => Promise<boolean>;
    clearSession: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserMe | null>(null);
    const [membership, setMembership] = useState<Membership | null>(null);
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = user !== null && membership !== null && organization !== null;

    const clearSession = () => {
        localStorage.removeItem(SESSION_FLAG_KEY);
        setUser(null);
        setMembership(null);
        setOrganization(null);
    };

    const refreshSession = async (): Promise<boolean> => {
        try {
            const user = await getUserMe();
            const membership = getActiveMembership(user.memberships);

            localStorage.setItem(SESSION_FLAG_KEY, '1');
            setUser(user);
            setMembership(membership);
            setOrganization(membership.organization);

            return true;
        } catch (err) {
            clearSession();

            if (err instanceof RestrictedAccessError) {
                await logout();
                toast.error('Acceso restringido');
                return false;
            }

            if (axios.isAxiosError(err) && err.response?.status === 401) {
                return false;
            }

            console.error(err);
            return false;
        }
    };

    useEffect(() => {
        if (!localStorage.getItem(SESSION_FLAG_KEY)) {
            setIsLoading(false);
            return;
        }

        const loadSession = async () => {
            setIsLoading(true);
            await refreshSession();
            setIsLoading(false);
        };

        loadSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                membership,
                organization,
                isLoading,
                isAuthenticated,
                refreshSession,
                clearSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
