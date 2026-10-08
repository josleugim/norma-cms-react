import {
    MAX_DEDUP_FILES,
    type DedupUploadResponse,
    type LandingAIUploadResponse,
    type OcrResolutionsUploadResponse,
} from '../types/upload';
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

export const uploadLandingAI = async (file: File): Promise<LandingAIUploadResponse> => {
    const formData = new FormData();
    formData.append('files', file);

    const { data } = await api.post<LandingAIUploadResponse>(
        '/upload/ocr-landing-ai',
        formData,
    );
    return data;
};

const isJsonFile = (file: File) => file.name.toLowerCase().endsWith('.json');

type UploadDedupOptions = {
    onUploadProgress?: (percent: number) => void;
};

export const uploadDedup = async (
    files: File[],
    options: UploadDedupOptions = {},
): Promise<DedupUploadResponse> => {
    if (files.length === 0) {
        throw new Error('Debes seleccionar al menos un archivo JSON');
    }

    if (files.length > MAX_DEDUP_FILES) {
        throw new Error(`Puedes subir un máximo de ${MAX_DEDUP_FILES} archivos`);
    }

    if (files.some((file) => !isJsonFile(file))) {
        throw new Error('Solo se permiten archivos JSON');
    }

    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    const { data } = await api.post<DedupUploadResponse>(
        '/upload/dedup',
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
