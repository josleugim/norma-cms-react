import { useState } from "react";
import type { User } from "../types/user";
import { getAllUsers } from "../api/user";
import { useEffect, useCallback } from "react";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getAllUsers();

                if (!cancelled) {
                    setUsers(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar los usuarios');
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
    }, [reloadKey]);

    const refetch = useCallback(() => {
        setReloadKey((key) => key + 1);
    }, []);

    return { users, isLoading, error, refetch };
}

export default useUsers;