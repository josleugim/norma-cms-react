import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../api/auth';

const useCreateUser = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await signup({ firstName, lastName, email, password, confirmPassword });
            navigate('/users');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el usuario');
        } finally {
            setIsSubmitting(false);
        }
    }, [firstName, lastName, email, password, confirmPassword, navigate]);

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        submit,
        isSubmitting,
        error,
    };
};

export default useCreateUser;
