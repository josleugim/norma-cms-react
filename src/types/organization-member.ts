import type { Organization } from "./organization";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export type OrganizationMember = {
    organizationId: number;
    userId: number;
    title: string;
    isActive: boolean;
    createdAt: Date;
    organization: Organization;
    user: User;
}

export type OrganizationMemberListResponse = {
    items: OrganizationMember[];
    page: number;
    pageSize: number;
    total: number;
}

export type OrganizationMemberQueryParams = {
    page?: number;
    pageSize?: number;
    organizationId?: number;
}

export type OrganizationMemberCreateRequest = {
    organizationId: number;
    userId: number;
    title: string;
    roles: number[];
}