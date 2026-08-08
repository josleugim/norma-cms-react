import type { DigitalResolutionEmbeddingResponse } from '../types/digital-resolution';
import { api } from './client';

export const generateDigitalResolutionEbedding = async (caseLink: string): Promise<DigitalResolutionEmbeddingResponse> => {
    const { data } = await api.post<DigitalResolutionEmbeddingResponse>('/digital-resolution/embedding', { caseLink });
    return data;
};