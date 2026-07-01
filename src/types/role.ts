export type Role = {
    id: number;
    organizationId: number;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    isSystem: boolean;
    createdAt: string;
};

export type RoleListResponse = {
    items: Role[];
    page: number;
    pageSize: number;
    total: number;
};

export type RoleQueryParams = {
    page?: number;
    pageSize?: number;
    organizationId?: number;
};

export type RoleCreateRequest = {
    organizationId: number;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
};