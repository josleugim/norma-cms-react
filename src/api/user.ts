import type { Membership, UserMe } from '../types';
import { RestrictedAccessError } from '../errors/RestrictedAccessError';
import { api } from './client';
import type { User, UserListResponse } from '../types/user';

const ALLOWED_ORG_SLUG = 'norma+';

export const getUserMe = async (): Promise<UserMe> => {
    const { data } = await api.get<UserMe>('/users/me');
    return data;
};

export const getActiveMembership = (memberships: Membership[]): Membership => {
    const membership = memberships.find(
        (membership) =>
            membership.isActive &&
            membership.organization.isActive &&
            membership.organization.slug === ALLOWED_ORG_SLUG,
    ) ?? null;

    if (!membership) {
        throw new RestrictedAccessError();
    }

    return membership;
};

export const getAllUsers = async (): Promise<User[]> => {
    const { data } = await api.get<UserListResponse>('/users');
    return data.items;
};

export const activateOrDeactivateUser = async (userId: string, isActive: boolean): Promise<void> => {
    await api.patch(`/users/${userId}`, { isActive: isActive });
};
