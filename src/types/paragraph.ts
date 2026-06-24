export type Paragraph = {
    id: number;
    content: string;
    isActive: boolean;
    caseLink: string;
    titles: string[];
}

export type ParagraphListResponse = {
    items: Paragraph[];
    page: number;
    pageSize: number;
    total: number;
};

export type ParagraphQueryParams = {
    page?: number;
    pageSize?: number;
    caseLink?: string;
};

export type ParagraphEditRequest = {
    content: string;
    isActive: boolean;
};