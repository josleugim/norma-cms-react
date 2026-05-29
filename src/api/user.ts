import type { Membership, UserMe } from '../types';
import { RestrictedAccessError } from '../errors/RestrictedAccessError';
import { logout } from './auth';
import { api } from './client';

const ALLOWED_ORG_SLUG = 'norma+';

export const getUserMe = async (): Promise<UserMe> => {
    const { data } = await api.get<UserMe>('/users/me');
    return data;
};

export const getActiveMembership = async (memberships: Membership[]): Promise<Membership> => {
    const membership = memberships.find(
        (membership) =>
            membership.isActive &&
            membership.organization.isActive &&
            membership.organization.slug === ALLOWED_ORG_SLUG,
    ) ?? null;

    if (!membership) {
        await logout();
        throw new RestrictedAccessError();
    }

    return membership;
};
