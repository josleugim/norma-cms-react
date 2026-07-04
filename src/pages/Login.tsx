import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const { login, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        await login({ email, password });
    };

    return (
        <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default Login;
