import { api } from './client';
import type { UserCreateRequest } from '../types/user';

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

export const signup = async (request: UserCreateRequest): Promise<void> => {
    const { data } = await api.post<void>('/auth/signup', request);
    return data;
};
