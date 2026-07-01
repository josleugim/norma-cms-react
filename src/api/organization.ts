import { api } from './client';
import type { OrganizationListResponse, OrganizationQueryParams } from '../types/organization';

export const getOrganizations = async (
    params: OrganizationQueryParams = {}
): Promise<OrganizationListResponse> => {
    const { data } = await api.get<OrganizationListResponse>('/organizations', { params });
    return data;
};