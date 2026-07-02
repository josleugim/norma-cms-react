import { api } from './client';
import type { OrganizationMemberQueryParams, OrganizationMemberListResponse, OrganizationMemberCreateRequest, OrganizationMember } from '../types/organization-member';

export const getOrganizationMembers = async (params: OrganizationMemberQueryParams): Promise<OrganizationMemberListResponse> => {
    const { data } = await api.get<OrganizationMemberListResponse>('/organization-members', { params });
    return data;
}

export const createOrganizationMember = async (payload: OrganizationMemberCreateRequest): Promise<OrganizationMember> => {
    const { data } = await api.post<OrganizationMember>('/organization-members', payload);
    return data;
}