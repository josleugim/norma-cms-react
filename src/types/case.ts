export type Case = {
    id: number;
    name: string | null;
    caseLink: string;
    resolutionDate: string | null;
    parent?: Case;
};

export type CaseListResponse = {
    items: Case[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type CaseQueryParams = {
    page?: number;
    pageSize?: number;
    limit?: number;
};

export type CaseUpdateRequest = {
    name?: string | null;
    parentId?: number | null;
};