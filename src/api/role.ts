import { api } from './client';
import type { RoleQueryParams, RoleListResponse, RoleCreateRequest, Role } from '../types/role';

export const getRoles = async (
    params: RoleQueryParams = {}
): Promise<RoleListResponse> => {
    const { data } = await api.get<RoleListResponse>('/roles', { params });
    return data;
};

export const createRole = async (payload: RoleCreateRequest): Promise<Role> => {
    const { data } = await api.post<Role>('/roles', payload);
    return data;
};