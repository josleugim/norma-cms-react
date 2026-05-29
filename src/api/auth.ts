import { api } from './client';

export const logout = async () => {
    await api.post('/auth/logout');
};

export const login = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post<Record<string, unknown>>('/auth/login', credentials);

    return data;
};
