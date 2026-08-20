import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { getSanitizedJsonDownloadUrl, getSanitizedJsonFiles } from '../api/sanitized-json';
import type { SanitizedJsonFile } from '../types/sanitized-json';

const getErrorMessage = (err: unknown, fallback: string) => {
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

    return fallback;
};

const fileNameFromKey = (key: string) => key.split('/').pop() || key;

const triggerBrowserDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

const useSanitizedJsonFiles = () => {
    const [files, setFiles] = useState<SanitizedJsonFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getSanitizedJsonFiles();
                if (!cancelled) {
                    setFiles(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(getErrorMessage(err, 'Error al cargar los archivos'));
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, []);

    const downloadFile = useCallback(async (file: SanitizedJsonFile) => {
        setDownloadingKey(file.key);

        try {
            const { url } = await getSanitizedJsonDownloadUrl(file.key);
            triggerBrowserDownload(url, fileNameFromKey(file.key));
        } catch (err) {
            toast.error(getErrorMessage(err, 'Error al descargar el archivo'));
        } finally {
            setDownloadingKey(null);
        }
    }, []);

    return {
        files,
        isLoading,
        error,
        downloadFile,
        downloadingKey,
    };
};

export default useSanitizedJsonFiles;
