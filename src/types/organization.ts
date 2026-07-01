export type Organization = {
    id: number;
    slug: string;
    name: string;
    isActive: boolean;
    createdAt: string;
};

export type OrganizationListResponse = {
    items: Organization[];
    page: number;
    pageSize: number;
    total: number;
};

export type OrganizationQueryParams = {
    page?: number;
    pageSize?: number;
}