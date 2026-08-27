import { api } from './client';
import type { Case, CaseListResponse, CaseQueryParams, CaseUpdateRequest } from '../types/case';

export const getCases = async (
    params: CaseQueryParams = {}
): Promise<CaseListResponse> => {
    const { data } = await api.get<CaseListResponse>('/cases', { params });
    return data;
};

export const getCase = async (id: number): Promise<Case> => {
    const { data } = await api.get<Case>(`/cases/${id}`);
    return data;
};

export const updateCase = async (caseId: number, payload: CaseUpdateRequest): Promise<Case> => {
    const { data } = await api.patch<Case>(`/cases/${caseId}`, payload);
    return data;
};