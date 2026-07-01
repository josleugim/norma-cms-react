import RoleCreateForm from '../components/RoleCreateForm';
import useCreateRole from '../hooks/useCreateRole';

const RoleCreate = () => {
    const createRole = useCreateRole();

    return (
        <div>
            <h1 className="title">Crear rol</h1>
            <RoleCreateForm {...createRole} />
        </div>
    );
};

export default RoleCreate;
