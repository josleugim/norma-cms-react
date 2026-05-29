import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { login as loginRequest, logout } from '../api/auth';
import { getActiveMembership, getUserMe } from '../api/user';
import { RestrictedAccessError } from '../errors/RestrictedAccessError';

const useLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = async (authData: { email: string; password: string }): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await loginRequest(authData);
            const user = await getUserMe();
            getActiveMembership(user.memberships);
            navigate('/', { replace: true });

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
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};

export default useLogin;

