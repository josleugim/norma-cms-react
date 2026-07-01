import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link } from 'react-router';
import type { Organization } from '../types/organization';

type RoleCreateFormProps = {
    organizations: Organization[];
    organizationId: number | undefined;
    setOrganizationId: (value: number | undefined) => void;
    name: string;
    setName: (value: string) => void;
    code: string;
    setCode: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const RoleCreateForm = ({
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
}: RoleCreateFormProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const organizationOptions = organizations.map((org) => ({
        label: org.name,
        value: org.id,
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
                <label className="label" htmlFor="name">
                    Nombre
                </label>
                <div className="control">
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="code">
                    Código
                </label>
                <div className="control">
                    <InputText
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="description">
                    Descripción
                </label>
                <div className="control">
                    <InputTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Activo</label>
                <div className="control">
                    <InputSwitch
                        checked={isActive}
                        onChange={(e) => setIsActive(e.value)}
                    />
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label="Crear rol"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="control">
                    <Link to="/roles" className="button">
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default RoleCreateForm;
