import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { uploadCaseGeneralInformation } from '../api/case';
import { useAuth } from '../context/AuthContext';
import {
    MAX_CASE_GENERAL_INFORMATION_CSV_BYTES,
    type CaseGeneralInformationUploadResponse,
} from '../types/case';

const isCsvFile = (file: File) => file.name.toLowerCase().endsWith('.csv');

const readMessage = (data: unknown) => {
    if (typeof data === 'string' && data.trim()) {
        return data;
    }

    if (data && typeof data === 'object' && 'message' in data) {
        const message = (data as { message?: string | string[] }).message;

        if (Array.isArray(message)) {
            return message.join(', ');
        }

        if (typeof message === 'string' && message.trim()) {
            return message;
        }
    }

    return null;
};

const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        const message = readMessage(err.response?.data);

        if (message) {
            return message;
        }
    }

    if (err instanceof Error) {
        return err.message;
    }

    return 'Error al subir el archivo';
};

const resultSummary = (updated: number, skipped: number) => {
    const updatedText = updated === 1
        ? 'Se actualizó 1 caso'
        : `Se actualizaron ${updated} casos`;
    const skippedText = skipped === 1
        ? 'se omitió 1 fila'
        : `se omitieron ${skipped} filas`;

    return `${updatedText}; ${skippedText}.`;
};

const useUploadCaseGeneralInformation = () => {
    const { clearSession } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<CaseGeneralInformationUploadResponse | null>(null);

    const selectFile = useCallback((next: File | null) => {
        setFile(next);
        setResult(null);

        if (!next) {
            setError(null);
            return;
        }

        if (!isCsvFile(next)) {
            setError('El archivo debe ser un CSV');
            return;
        }

        if (next.size > MAX_CASE_GENERAL_INFORMATION_CSV_BYTES) {
            setError('El archivo no puede superar 20 MB');
            return;
        }

        setError(null);
    }, []);

    const clearFile = useCallback(() => {
        setFile(null);
        setError(null);
        setResult(null);
        setFileInputKey((key) => key + 1);
    }, []);

    const submit = useCallback(async () => {
        if (!file) {
            setError('Debes seleccionar un archivo CSV');
            setResult(null);
            return;
        }

        if (!isCsvFile(file)) {
            setError('El archivo debe ser un CSV');
            setResult(null);
            return;
        }

        if (file.size > MAX_CASE_GENERAL_INFORMATION_CSV_BYTES) {
            setError('El archivo no puede superar 20 MB');
            setResult(null);
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setResult(null);

        try {
            const data = await uploadCaseGeneralInformation(file);
            const updated = typeof data?.updated === 'number' ? data.updated : 0;
            const skipped = Array.isArray(data?.skipped) ? data.skipped : [];
            const nextResult = { updated, skipped };

            setResult(nextResult);
            const summary = resultSummary(updated, skipped.length);
            if (skipped.length > 0) {
                toast.warning(summary);
            } else {
                toast.success(summary);
            }
            setFile(null);
            setFileInputKey((key) => key + 1);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                clearSession();
                return;
            }

            if (axios.isAxiosError(err) && err.response?.status === 403) {
                const message = readMessage(err.response?.data) ?? 'Acceso restringido';
                setError(message);
                toast.error(message);
                return;
            }

            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    }, [clearSession, file]);

    return {
        file,
        selectFile,
        clearFile,
        fileInputKey,
        submit,
        isSubmitting,
        error,
        result,
    };
};

export default useUploadCaseGeneralInformation;
