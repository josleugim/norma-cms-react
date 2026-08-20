export type SanitizedJsonFile = {
    key: string;
    size: number;
    lastModified?: string;
};

export type SanitizedJsonDownloadResponse = {
    key: string;
    url: string;
};
