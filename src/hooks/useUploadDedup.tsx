import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { uploadDedup } from '../api/upload';
import { useAuth } from '../context/AuthContext';
import { MAX_DEDUP_FILES } from '../types/upload';

const isJsonFile = (file: File) => file.name.toLowerCase().endsWith('.json');

const acceptedMessage = (accepted: number) =>
    accepted === 1
        ? 'Se aceptó 1 archivo. Se está procesando.'
        : `Se aceptaron ${accepted} archivos. Se están procesando.`;

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

        if (err.response?.status === 400 && message === 'JSON file is required') {
            return 'Debes seleccionar al menos un archivo JSON';
        }

        if (message) {
            return message;
        }
    }

    if (err instanceof Error) {
        return err.message;
    }

    return 'Error al subir los archivos';
};

const useUploadDedup = () => {
    const { clearSession } = useAuth();
    const [files, setFiles] = useState<File[]>([]);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const selectFiles = useCallback((next: File[]) => {
        setFiles(next);
        setSuccessMessage(null);
        setUploadProgress(0);

        if (next.length === 0) {
            setError(null);
            return;
        }

        if (next.some((file) => !isJsonFile(file))) {
            setError('Solo se permiten archivos JSON');
            return;
        }

        if (next.length > MAX_DEDUP_FILES) {
            setError(`Puedes subir un máximo de ${MAX_DEDUP_FILES} archivos`);
            return;
        }

        setError(null);
    }, []);

    const clearFiles = useCallback(() => {
        setFiles([]);
        setError(null);
        setSuccessMessage(null);
        setUploadProgress(0);
        setFileInputKey((key) => key + 1);
    }, []);

    const submit = useCallback(async () => {
        if (files.length === 0) {
            setError('Debes seleccionar al menos un archivo JSON');
            setSuccessMessage(null);
            return;
        }

        if (files.some((file) => !isJsonFile(file))) {
            setError('Solo se permiten archivos JSON');
            setSuccessMessage(null);
            return;
        }

        if (files.length > MAX_DEDUP_FILES) {
            setError(`Puedes subir un máximo de ${MAX_DEDUP_FILES} archivos`);
            setSuccessMessage(null);
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);
        setError(null);
        setSuccessMessage(null);

        try {
            const data = await uploadDedup(files, {
                onUploadProgress: setUploadProgress,
            });
            const accepted = typeof data?.accepted === 'number' ? data.accepted : files.length;
            const message = acceptedMessage(accepted);

            setSuccessMessage(message);
            toast.success(message);
            setFiles([]);
            setFileInputKey((key) => key + 1);
            setUploadProgress(0);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                clearSession();
                return;
            }

            if (axios.isAxiosError(err) && err.response?.status === 403) {
                setError('Acceso restringido');
                toast.error('Acceso restringido');
                return;
            }

            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    }, [clearSession, files]);

    return {
        files,
        selectFiles,
        clearFiles,
        fileInputKey,
        submit,
        isSubmitting,
        uploadProgress,
        error,
        successMessage,
    };
};

export default useUploadDedup;
