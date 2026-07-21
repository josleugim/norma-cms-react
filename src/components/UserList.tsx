import useUsers from "../hooks/useUsers";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UserList = () => {
    const { users, isLoading, error } = useUsers();

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <div>
            <DataTable
                value={users}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
                loading={isLoading}
                emptyMessage="No hay usuarios para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="id" header="ID" style={{ width: '3rem' }} />
                <Column field="firstName" header="Nombre" />
                <Column field="lastName" header="Apellido" />
                <Column field="email" header="Correo" />
                <Column field="isActive" header="Activo" />
                <Column field="createdAt" header="Creado" />
            </DataTable>
        </div>
    );
};

export default UserList;