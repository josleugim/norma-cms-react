import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login as loginRequest, logout } from '../api/auth';
import { getActiveMembership, getUserMe } from '../api/user';
import { RestrictedAccessError } from '../errors/RestrictedAccessError';
import type { LoginResult } from '../types';

const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (authData: { email: string; password: string }): Promise<LoginResult | null> => {
        setIsLoading(true);
        setError(null);

        try {
            await loginRequest(authData);
            const user = await getUserMe();
            const membership = getActiveMembership(user.memberships);

            return {
                user,
                membership,
                organization: membership.organization,
            };
        } catch (err) {
            await logout();

            if (err instanceof RestrictedAccessError) {
                toast.error('Acceso restringido');
                setError('Acceso restringido');
                navigate('/login', { replace: true });
            } else {
                const message = err instanceof Error ? err.message : 'Login failed';
                setError(message);
            }

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};

export default useLogin;
