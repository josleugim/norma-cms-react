import { Link } from "react-router";
import RoleList from "../components/RoleList";

const Role = () => {
    return (
        <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                <h1 className="title mb-0">Roles</h1>
                <Link to="/roles/create" className="button is-primary">
                    Crear rol
                </Link>
            </div>
            <RoleList />
        </div>
    );
};

export default Role;