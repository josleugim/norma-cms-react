import { useCallback, useEffect, useState } from "react";
import type { RoleListResponse } from "../types/role";
import type { Organization } from "../types/organization";
import { getRoles } from "../api/role";
import { getOrganizations } from "../api/organization";
import type { DataTableStateEvent } from "primereact/datatable";

const DEFAULT_PAGE_SIZE = 10;
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

const useRoles = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(DEFAULT_PAGE_SIZE);
    const [organizationId, setOrganizationId] = useState<number | undefined>(undefined);
    const [data, setData] = useState<RoleListResponse>({
        items: [],
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        total: 0,
    });
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const page = Math.floor(first / rows) + 1;

    useEffect(() => {
        let cancelled = false;

        getOrganizations({ pageSize: 200 }).then((response) => {
            if (!cancelled) setOrganizations(response.items);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getRoles({
                    page,
                    pageSize: rows,
                    ...(organizationId ? { organizationId } : {}),
                });

                if (!cancelled) {
                    setData(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar los roles');
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
    }, [page, rows, organizationId]);

    const onPageChange = useCallback((event: DataTableStateEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    }, []);

    const onOrganizationChange = useCallback((id: number | undefined) => {
        setFirst(0);
        setOrganizationId(id);
    }, []);

    return {
        items: data.items,
        first,
        rows,
        totalRecords: data.total,
        rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
        onPageChange,
        organizations,
        organizationId,
        onOrganizationChange,
        isLoading,
        error,
    };
};

export default useRoles;