import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'sonner';
import { login as loginRequest, logout } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const useLogin = () => {
    const navigate = useNavigate();
    const { refreshSession, clearSession } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = async (authData: { email: string; password: string }): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await loginRequest(authData);
            const isValid = await refreshSession();

            if (!isValid) {
                setError('Acceso restringido');
                navigate('/login', { replace: true });
                return;
            }

            navigate('/', { replace: true });
        } catch (err) {
            await logout();
            clearSession();

            let message = '';
            
            if (axios.isAxiosError(err)) {
                message = 'Error al iniciar sesión';
            }

            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};

export default useLogin;
