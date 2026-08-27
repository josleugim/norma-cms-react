import { useCallback, useEffect, useState } from "react";
import type { CaseListResponse } from "../types/case";
import { getCases } from "../api/case";
import type { DataTableStateEvent } from "primereact/datatable";

const DEFAULT_PAGE_SIZE = 10;
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];
    
const useCases = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(DEFAULT_PAGE_SIZE);
    const [data, setData] = useState<CaseListResponse>({
        items: [],
        total: 0,
        page: 1,
        limit: DEFAULT_PAGE_SIZE,
        totalPages: 0,
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
                const response = await getCases({ page, pageSize: rows });
                if (!cancelled) {
                    setData(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar los casos');
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
    }, [page, rows]);

    const onPageChange = useCallback((event: DataTableStateEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    }, []);

    return {
        items: data.items,
        first,
        rows,
        totalRecords: data.total,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
        onPageChange,
        isLoading,
        error,
    };
};

export default useCases;