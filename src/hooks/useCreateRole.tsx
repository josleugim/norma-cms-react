import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { Organization } from '../types/organization';
import { getOrganizations } from '../api/organization';
import { createRole } from '../api/role';

const useCreateRole = () => {
    const navigate = useNavigate();

    const [organizationId, setOrganizationId] = useState<number | undefined>(undefined);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true);

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        getOrganizations({ pageSize: 200 }).then((response) => {
            if (!cancelled) setOrganizations(response.items);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const submit = useCallback(async () => {
        if (!organizationId) {
            setError('Debes seleccionar una organización');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await createRole({ organizationId, name, code, description, isActive });
            navigate('/roles');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el rol');
        } finally {
            setIsSubmitting(false);
        }
    }, [organizationId, name, code, description, isActive, navigate]);

    return {
        organizations,
        organizationId,
        setOrganizationId,
        name,
        setName,
        code,
        setCode,
        description,
        setDescription,
        isActive,
        setIsActive,
        submit,
        isSubmitting,
        error,
    };
};

export default useCreateRole;
