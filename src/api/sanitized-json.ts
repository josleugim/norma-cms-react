import type { SanitizedJsonDownloadResponse, SanitizedJsonFile } from '../types/sanitized-json';
import { api } from './client';

export const getSanitizedJsonFiles = async (): Promise<SanitizedJsonFile[]> => {
    const { data } = await api.get<SanitizedJsonFile[]>('/cases/sanitized-json');
    return data;
};

export const getSanitizedJsonDownloadUrl = async (
    key: string,
): Promise<SanitizedJsonDownloadResponse> => {
    const { data } = await api.get<SanitizedJsonDownloadResponse>('/cases/sanitized-json/download', {
        params: { key },
    });
    return data;
};
