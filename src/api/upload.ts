import type { OcrResolutionsUploadResponse } from '../types/upload';
import { api } from './client';

type UploadOcrResolutionsOptions = {
    onUploadProgress?: (percent: number) => void;
};

export const uploadOcrResolutions = async (
    file: File,
    options: UploadOcrResolutionsOptions = {},
): Promise<OcrResolutionsUploadResponse> => {
    const formData = new FormData();
    formData.append('files', file);

    const { data } = await api.post<OcrResolutionsUploadResponse>(
        '/upload/ocr-resolutions',
        formData,
        {
            timeout: 0,
            onUploadProgress: (event) => {
                if (!event.total) return;
                options.onUploadProgress?.(Math.round((event.loaded * 100) / event.total));
            },
        },
    );

    return data;
};
