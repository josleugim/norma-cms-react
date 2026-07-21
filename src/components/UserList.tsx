import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import type { User } from "../types/user";
import useUsers from "../hooks/useUsers";

const UserList = () => {
    const { users, isLoading, error, toggleUserActive, togglingUserId } = useUsers();

    const statusBody = (user: User) => (
        <Tag
            value={user.isActive ? 'Activo' : 'Inactivo'}
            severity={user.isActive ? 'success' : 'danger'}
        />
    );

    const createdAtBody = (user: User) =>
        new Date(user.createdAt).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });

    const optionsBody = (user: User) => (
        <Button
            className={`button is-small ${user.isActive ? 'is-danger is-outlined' : 'is-success'}`}
            label={user.isActive ? 'Desactivar' : 'Activar'}
            size="small"
            loading={togglingUserId === user.id}
            disabled={togglingUserId !== null}
            onClick={() => toggleUserActive(user)}
        />
    );

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
                <Column header="Estado" body={statusBody} style={{ width: '8rem' }} />
                <Column header="Creado" body={createdAtBody} style={{ width: '10rem' }} />
                <Column header="Opciones" body={optionsBody} style={{ width: '9rem' }} />
            </DataTable>
        </div>
    );
};

export default UserList;
