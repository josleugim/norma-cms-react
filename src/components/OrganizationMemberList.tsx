import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import type { OrganizationMember } from '../types/organization-member';
import type { Organization } from '../types/organization';
import useOrganizationMember from '../hooks/useOrganizationMember';

const OrganizationMemberList = () => {
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
    } = useOrganizationMember();

    const organizationOptions = [
        { label: 'Todas las organizaciones', value: undefined },
        ...organizations.map((org: Organization) => ({ label: org.name, value: org.id })),
    ];

    const statusBody = (member: OrganizationMember) => (
        <Tag
            value={member.isActive ? 'Activo' : 'Inactivo'}
            severity={member.isActive ? 'success' : 'danger'}
        />
    );

    const createdAtBody = (member: OrganizationMember) =>
        new Date(member.createdAt).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });

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
                emptyMessage="No hay miembros para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column header="Usuario" body={(m: OrganizationMember) => `${m.user.firstName} — ${m.user.email}`} />
                <Column header="Organización" body={(m: OrganizationMember) => m.organization.name} style={{ width: '12rem' }} />
                <Column field="title" header="Título" style={{ width: '10rem' }} />
                <Column header="Estado" body={statusBody} style={{ width: '8rem' }} />
                <Column header="Creado" body={createdAtBody} style={{ width: '10rem' }} />
            </DataTable>
        </div>
    );
};

export default OrganizationMemberList;
