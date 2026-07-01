import { useNavigate } from "react-router";
import useOrganizations from "../hooks/useOrganizations";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const OrganizationList = () => {
    const {
        items,
        first,
        rows,
        totalRecords,
        rowsPerPageOptions,
        onPageChange,
        isLoading,
        error,
    } = useOrganizations();

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <div>
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
                emptyMessage="No hay organizaciones para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="id" header="ID" style={{ width: '3rem' }} />
                <Column field="slug" header="Slug" style={{ width: '10rem' }} />
                <Column field="name" header="Nombre" />
                <Column field="isActive" header="Activo" />
                <Column field="createdAt" header="Creado" />
            </DataTable>
        </div>
    );
};

export default OrganizationList;