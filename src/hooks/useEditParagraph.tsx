import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { editParagraph, getParagraph } from '../api/paragraph';

const useEditParagraph = (id: number) => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const paragraph = await getParagraph(id);

                if (!cancelled) {
                    setContent(paragraph.content);
                    setIsActive(paragraph.isActive);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar el criterio');
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
            await editParagraph(id, { content, isActive });
            navigate('/criteria');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar el criterio');
        } finally {
            setIsSubmitting(false);
        }
    }, [content, id, isActive, navigate]);

    return {
        content,
        isActive,
        setContent,
        setIsActive,
        submit,
        isLoading,
        isSubmitting,
        error,
    };
};

export default useEditParagraph;
