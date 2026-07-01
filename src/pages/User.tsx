import { Link } from "react-router";
import UserList from "../components/UserList";

const User = () => {
    return (
        <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                <h1 className="title mb-0">Usuarios</h1>
                <Link to="/users/create" className="button is-primary">
                    Crear usuario
                </Link>
            </div>
            <UserList />
        </div>
    );
};

export default User;