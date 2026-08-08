export type DigitalResolution = {
    id: number;
    caseLink: string;
    page: number;
    chunk_type: string;
    text: string;
    textHtml: string;
    isActive: boolean;
    createdAt: string;
};

export type DigitalResolutionEmbeddingResponse = {
    caseLink: string;
    total: number;
    embedded: number;
    skipped: number;
};