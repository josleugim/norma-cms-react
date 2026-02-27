import { useState, useEffect } from 'react';

const useLogin = () => {
    const [authData] = useState<{ email: string, password: string }>({ email: '', password: '' });

    useEffect(() => {
        
    }, [authData]);

    const postLogin = async (authData: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(authData),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            
            // TODO: Handle successful login
            console.log('Login successful');
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (authData: { email: string, password: string }) => {
        const response: any = await postLogin(authData);
        console.log(response);
    };

    return { login };
}

export default useLogin;