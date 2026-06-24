import { api } from './client';
import type { ParagraphListResponse, ParagraphQueryParams } from '../types/paragraph';

export const getParagraphs = async (
    params: ParagraphQueryParams = {}
): Promise<ParagraphListResponse> => {
    const { data } = await api.get<ParagraphListResponse>('/paragraphs', { params });
    return data;
};