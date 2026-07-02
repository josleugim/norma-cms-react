export type Organization = {
    id: number;
    slug: string;
    name: string;
    isActive: boolean;
    createdAt: string;
};

export type Role = {
    id: number;
    organizationId: number;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    isSystem: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Membership = {
    id: number;
    organizationId: number;
    userId: number;
    title: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string | null;
    organization: Organization;
    roles: Role[];
};

export type UserMe = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    memberships: Membership[];
};

export type LoginResult = {
    user: UserMe;
    membership: Membership;
    organization: Organization;
};

export type UserCreateRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}