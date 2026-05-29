import { api } from './client';

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch {
        // Session may already be invalid or expired
    }
};

export const login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post<Record<string, unknown>>('/auth/login', credentials);

    return data;
};
