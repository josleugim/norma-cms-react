import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { uploadLandingAI } from '../api/upload';
import { MAX_LANDING_AI_JSON_BYTES } from '../types/upload';

const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string | string[] } | string | undefined;

        if (typeof data === 'string' && data.trim()) {
            return data;
        }

        if (data && typeof data === 'object' && data.message) {
            return Array.isArray(data.message) ? data.message.join(', ') : data.message;
        }
    }

    if (err instanceof Error) {
        return err.message;
    }

    return 'Error al subir el archivo';
};

const useUploadLandingAi = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async () => {
        if (!file) {
            setError('Debes seleccionar un archivo JSON');
            return;
        }

        if (file.type !== 'application/json' && !file.name.toLowerCase().endsWith('.json')) {
            setError('El archivo debe ser un JSON');
            return;
        }

        if (file.size > MAX_LANDING_AI_JSON_BYTES) {
            setError('El archivo no puede superar 700 MB');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await uploadLandingAI(file);
            toast.success('El archivo se subió correctamente');
            setFile(null);
            setFileInputKey((key) => key + 1);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    }, [file]);

    return {
        file,
        setFile,
        fileInputKey,
        submit,
        isSubmitting,
        error,
    };
};

export default useUploadLandingAi;
