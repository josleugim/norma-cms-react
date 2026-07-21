import { useState, useEffect, useCallback } from "react";
import type { User } from "../types/user";
import { getAllUsers, activateOrDeactivateUser } from "../api/user";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [togglingUserId, setTogglingUserId] = useState<number | null>(null);

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

    const toggleUserActive = useCallback(async (user: User) => {
        setTogglingUserId(user.id);
        setError(null);

        try {
            await activateOrDeactivateUser(user.id, !user.isActive);
            setUsers((current) =>
                current.map((item) =>
                    item.id === user.id ? { ...item, isActive: !user.isActive } : item,
                ),
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el usuario');
        } finally {
            setTogglingUserId(null);
        }
    }, []);

    return { users, isLoading, error, refetch, toggleUserActive, togglingUserId };
}

export default useUsers;