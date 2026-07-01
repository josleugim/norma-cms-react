import UserCreateForm from "../components/UserCreateForm";
import useCreateUser from "../hooks/useCreateUser";

const UserCreate = () => {
    const createUser = useCreateUser();

    return (
        <div>
            <h1 className="title">Crear usuario</h1>
            <UserCreateForm {...createUser} />
        </div>
    );
};

export default UserCreate;