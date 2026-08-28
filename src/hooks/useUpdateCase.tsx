import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Case } from "../types/case";
import { getCase, getCases, updateCase } from "../api/case";

const ALL_CASES_LIMIT = 10000;

const useUpdateCase = (id: number) => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<Case[]>([]);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [caseResponse, casesResponse] = await Promise.all([
                    getCase(id),
                    getCases({ limit: ALL_CASES_LIMIT }),
                ]);

                if (!cancelled) {
                    setName(caseResponse.name ?? '');
                    setParentId(caseResponse.parent?.id ?? null);
                    setCases(casesResponse.items);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar el caso');
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
    }, [id]);

    const submit = useCallback(async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            await updateCase(id, {
                name: name.trim() || undefined,
                parentId,
            });
            navigate('/cases');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el caso');
        } finally {
            setIsSubmitting(false);
        }
    }, [id, name, parentId, navigate]);

    return {
        cases,
        parentId,
        setParentId,
        name,
        setName,
        submit,
        isLoading,
        isSubmitting,
        error,
    };
};

export default useUpdateCase;
