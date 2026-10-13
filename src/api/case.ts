import { api } from './client';
import type {
    Case,
    CaseGeneralInformationUploadResponse,
    CaseListResponse,
    CaseQueryParams,
    CaseUpdateRequest,
} from '../types/case';

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

export const uploadCaseGeneralInformation = async (
    file: File,
): Promise<CaseGeneralInformationUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<CaseGeneralInformationUploadResponse>(
        '/cases/general-information',
        formData,
        { timeout: 0 },
    );
    return data;
};