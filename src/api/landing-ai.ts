import type { LandingAiDownloadResponse, LandingAiFile } from '../types/landing-ai';
import { api } from './client';

export const getLandingAiFiles = async (): Promise<LandingAiFile[]> => {
    const { data } = await api.get<LandingAiFile[]>('/cases/landing-ai');
    return data;
};

export const getLandingAiDownloadUrl = async (
    key: string,
): Promise<LandingAiDownloadResponse> => {
    const { data } = await api.get<LandingAiDownloadResponse>('/cases/landing-ai/download', {
        params: { key },
    });
    return data;
};
