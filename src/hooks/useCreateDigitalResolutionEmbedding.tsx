import { useCallback, useState } from "react";
import { generateDigitalResolutionEbedding } from "../api/digital-resolution";
import type { DigitalResolutionEmbeddingResponse } from "../types/digital-resolution";

const useCreateDigitalResolutionEmbedding = () => {
    const [caseLink, setCaseLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<DigitalResolutionEmbeddingResponse | null>(null);

    const submit = useCallback(async () => {
        if (!caseLink) {
            setError('Debes ingresar un caso');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setResult(null);

        try {
            const response = await generateDigitalResolutionEbedding(caseLink);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el embedding');
        } finally {
            setIsSubmitting(false);
        }
    }, [caseLink]);

    return {
        caseLink,
        setCaseLink,
        submit,
        isSubmitting,
        error,
        result,
    };
};

export default useCreateDigitalResolutionEmbedding;