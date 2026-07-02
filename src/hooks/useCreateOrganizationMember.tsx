import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Organization } from '../types/organization';
import type { User } from '../types/user';
import type { Role } from '../types/role';
import { getOrganizations } from '../api/organization';
import { getAllUsers } from '../api/user';
import { getRoles } from '../api/role';
import { createOrganizationMember } from '../api/organization-member';

const useCreateOrganizationMember = () => {
    const navigate = useNavigate();

    const [organizationId, setOrganizationId] = useState<number | undefined>(undefined);
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            getOrganizations({ pageSize: 200 }),
            getAllUsers(),
        ]).then(([orgsResponse, usersResponse]) => {
            if (!cancelled) {
                setOrganizations(orgsResponse.items);
                setUsers(usersResponse);
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!organizationId) {
            setRoles([]);
            setSelectedRoles([]);
            return;
        }

        let cancelled = false;

        getRoles({ organizationId, pageSize: 200 }).then((response) => {
            if (!cancelled) setRoles(response.items);
        });

        return () => {
            cancelled = true;
        };
    }, [organizationId]);

    const handleSetOrganizationId = useCallback((id: number | undefined) => {
        setOrganizationId(id);
        setSelectedRoles([]);
    }, []);

    const submit = useCallback(async () => {
        if (!organizationId) {
            setError('Debes seleccionar una organización');
            return;
        }

        if (!userId) {
            setError('Debes seleccionar un usuario');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await createOrganizationMember({
                organizationId,
                userId,
                title,
                roles: selectedRoles,
            });
            navigate('/organization-members');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al agregar el miembro');
        } finally {
            setIsSubmitting(false);
        }
    }, [organizationId, userId, title, selectedRoles, navigate]);

    return {
        organizations,
        organizationId,
        setOrganizationId: handleSetOrganizationId,
        users,
        userId,
        setUserId,
        roles,
        selectedRoles,
        setSelectedRoles,
        title,
        setTitle,
        submit,
        isSubmitting,
        error,
    };
};

export default useCreateOrganizationMember;
