import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { uploadOcrResolutions } from '../api/upload';
import { MAX_OCR_PDF_BYTES } from '../types/upload';

const isPdfFile = (file: File) =>
    file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

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

const useUploadOcrResolutions = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async () => {
        if (!file) {
            setError('Debes seleccionar un archivo PDF');
            return;
        }

        if (!isPdfFile(file)) {
            setError('El archivo debe ser un PDF');
            return;
        }

        if (file.size > MAX_OCR_PDF_BYTES) {
            setError('El archivo no puede superar 700 MB');
            return;
        }

        setIsSubmitting(true);
        setIsProcessing(false);
        setUploadProgress(0);
        setError(null);

        try {
            await uploadOcrResolutions(file, {
                onUploadProgress: (percent) => {
                    setUploadProgress(percent);
                    if (percent >= 100) {
                        setIsProcessing(true);
                    }
                },
            });

            toast.success('El archivo se subió correctamente');
            setFile(null);
            setFileInputKey((key) => key + 1);
            setUploadProgress(0);
            setIsProcessing(false);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
            setIsProcessing(false);
        }
    }, [file]);

    return {
        file,
        setFile,
        fileInputKey,
        submit,
        isSubmitting,
        isProcessing,
        uploadProgress,
        error,
    };
};

export default useUploadOcrResolutions;
