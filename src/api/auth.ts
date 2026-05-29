import { api } from './client';

export const getAuthToken = (data: Record<string, unknown>): string | null => {
    const token = data.access_token ?? data.accessToken ?? data.token;
    return typeof token === 'string' ? token : null;
};

export const logout = () => {
    localStorage.removeItem('authToken');
};

export const login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post<Record<string, unknown>>('/auth/login', credentials);
    const token = getAuthToken(data);

    if (token) {
        localStorage.setItem('authToken', token);
    }

    return data;
};
