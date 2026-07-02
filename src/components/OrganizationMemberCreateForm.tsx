import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Link } from 'react-router';
import type { Organization } from '../types/organization';
import type { User } from '../types/user';
import type { Role } from '../types/role';

type OrganizationMemberCreateFormProps = {
    organizations: Organization[];
    organizationId: number | undefined;
    setOrganizationId: (value: number | undefined) => void;
    users: User[];
    userId: number | undefined;
    setUserId: (value: number | undefined) => void;
    roles: Role[];
    selectedRoles: number[];
    setSelectedRoles: (value: number[]) => void;
    title: string;
    setTitle: (value: string) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const OrganizationMemberCreateForm = ({
    organizations,
    organizationId,
    setOrganizationId,
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
}: OrganizationMemberCreateFormProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const organizationOptions = organizations.map((org) => ({
        label: org.name,
        value: org.id,
    }));

    const userOptions = users.map((user) => ({
        label: `${user.firstName} ${user.lastName} — ${user.email}`,
        value: user.id,
    }));

    const roleOptions = roles.map((role) => ({
        label: `${role.name} (${role.code})`,
        value: role.id,
    }));

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="organizationId">
                    Organización
                </label>
                <div className="control">
                    <Dropdown
                        id="organizationId"
                        value={organizationId}
                        options={organizationOptions}
                        onChange={(e) => setOrganizationId(e.value)}
                        placeholder="Selecciona una organización"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="userId">
                    Usuario
                </label>
                <div className="control">
                    <Dropdown
                        id="userId"
                        value={userId}
                        options={userOptions}
                        onChange={(e) => setUserId(e.value)}
                        placeholder="Selecciona un usuario"
                        filter
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="title">
                    Título
                </label>
                <div className="control">
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej. Administrador, Editor..."
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="roles">
                    Roles
                </label>
                <div className="control">
                    <MultiSelect
                        id="roles"
                        value={selectedRoles}
                        options={roleOptions}
                        onChange={(e) => setSelectedRoles(e.value)}
                        placeholder={organizationId ? 'Selecciona uno o más roles' : 'Selecciona primero una organización'}
                        disabled={!organizationId}
                        display="chip"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label="Agregar miembro"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="control">
                    <Link to="/organization-members" className="button">
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default OrganizationMemberCreateForm;
