import { useCallback, useEffect, useState } from "react";
import type { OrganizationListResponse } from "../types/organization";
import type { DataTableStateEvent } from "primereact/datatable";
import { getOrganizations } from "../api/organization";

const DEFAULT_PAGE_SIZE = 10;
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

const useOrganizations = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(DEFAULT_PAGE_SIZE);
    const [data, setData] = useState<OrganizationListResponse>({
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
                const response = await getOrganizations({
                    page,
                    pageSize: rows,
                });

                if (!cancelled) {
                    setData(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar las organizaciones');
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

export default useOrganizations;