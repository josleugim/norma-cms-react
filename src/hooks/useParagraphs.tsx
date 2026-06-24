import { useCallback, useEffect, useState } from 'react';
import type { DataTableStateEvent } from 'primereact/datatable';
import type { ParagraphListResponse } from '../types/paragraph';
import { getParagraphs } from '../api/paragraph';

const DEFAULT_PAGE_SIZE = 10;
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

const useParagraphs = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(DEFAULT_PAGE_SIZE);
    const [caseLink, setCaseLink] = useState('');
    const [caseLinkInput, setCaseLinkInput] = useState('');
    const [data, setData] = useState<ParagraphListResponse>({
        items: [],
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const page = Math.floor(first / rows) + 1;

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getParagraphs({
                    page,
                    pageSize: rows,
                    ...(caseLink ? { caseLink } : {}),
                });

                if (!cancelled) {
                    setData(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar los criterios');
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
    }, [page, rows, caseLink]);

    const onPageChange = useCallback((event: DataTableStateEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    }, []);

    const applyCaseLinkFilter = useCallback((value: string) => {
        setFirst(0);
        setCaseLink(value.trim());
    }, []);

    const clearCaseLinkFilter = useCallback(() => {
        setFirst(0);
        setCaseLink('');
        setCaseLinkInput('');
    }, []);

    return {
        items: data.items,
        first,
        rows,
        totalRecords: data.total,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
        onPageChange,
        caseLink,
        caseLinkInput,
        setCaseLinkInput,
        applyCaseLinkFilter,
        clearCaseLinkFilter,
        isLoading,
        error,
    };
};

export default useParagraphs;
