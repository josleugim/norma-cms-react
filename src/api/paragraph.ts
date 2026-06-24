import { api } from './client';
import type { Paragraph, ParagraphEditRequest, ParagraphListResponse, ParagraphQueryParams } from '../types/paragraph';

export const getParagraphs = async (
    params: ParagraphQueryParams = {}
): Promise<ParagraphListResponse> => {
    const { data } = await api.get<ParagraphListResponse>('/paragraphs', { params });
    return data;
};

export const getParagraph = async (id: number): Promise<Paragraph> => {
    const { data } = await api.get<Paragraph>(`/paragraphs/${id}`);
    return data;
};

export const editParagraph = async (id: number, data: ParagraphEditRequest): Promise<void> => {
    await api.patch(`/paragraphs/${id}`, data);
};