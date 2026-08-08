import { useCallback, useState } from "react";
import { generateDigitalResolutionEbedding } from "../api/digital-resolution";

const useCreateDigitalResolutionEmbedding = () => {
    const [caseLink, setCaseLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async () => {
        if (!caseLink) {
            setError('Debes ingresar un caso');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await generateDigitalResolutionEbedding(caseLink);
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
    };
};

export default useCreateDigitalResolutionEmbedding;