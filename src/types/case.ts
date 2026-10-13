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

export const MAX_CASE_GENERAL_INFORMATION_CSV_BYTES = 20 * 1024 * 1024;

export type CaseGeneralInformationSkippedRow = {
    row: number;
    caseLink: string | null;
    reason: string;
};

export type CaseGeneralInformationUploadResponse = {
    updated: number;
    skipped: CaseGeneralInformationSkippedRow[];
};