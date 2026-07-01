import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import type { Role } from '../types/role';
import type { Organization } from '../types/organization';
import useRoles from '../hooks/useRole';

const RoleList = () => {
    const {
        items,
        first,
        rows,
        totalRecords,
        rowsPerPageOptions,
        onPageChange,
        organizations,
        organizationId,
        onOrganizationChange,
        isLoading,
        error,
    } = useRoles();

    const organizationOptions = [
        { label: 'Todas las organizaciones', value: undefined },
        ...organizations.map((org: Organization) => ({ label: org.name, value: org.id })),
    ];

    const statusBody = (role: Role) => (
        <Tag
            value={role.isActive ? 'Activo' : 'Inactivo'}
            severity={role.isActive ? 'success' : 'danger'}
        />
    );

    const systemBody = (role: Role) => (
        <Tag
            value={role.isSystem ? 'Sistema' : 'Custom'}
            severity={role.isSystem ? 'info' : 'secondary'}
        />
    );

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <div>
            <div className="field mb-4">
                <div className="control">
                    <Dropdown
                        value={organizationId}
                        options={organizationOptions}
                        onChange={(e) => onOrganizationChange(e.value)}
                        placeholder="Filtrar por organización"
                        style={{ width: '20rem' }}
                    />
                </div>
            </div>

            {organizationId && (
                <p className="mb-3">
                    Organización: <strong>{organizations.find((o) => o.id === organizationId)?.name}</strong>
                </p>
            )}

            <DataTable
                value={items}
                lazy
                paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                onPage={onPageChange}
                loading={isLoading}
                emptyMessage="No hay roles para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="id" header="ID" style={{ width: '4rem' }} />
                <Column field="code" header="Código" style={{ width: '8rem' }} />
                <Column field="name" header="Nombre" style={{ width: '12rem' }} />
                <Column field="description" header="Descripción" />
                <Column header="Tipo" body={systemBody} style={{ width: '8rem' }} />
                <Column header="Estado" body={statusBody} style={{ width: '8rem' }} />
            </DataTable>
        </div>
    );
};

export default RoleList;
