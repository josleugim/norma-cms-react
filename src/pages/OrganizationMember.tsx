import { Link } from "react-router";
import OrganizationMemberList from "../components/OrganizationMemberList";

const OrganizationMember = () => {
    return (
        <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                <h1 className="title mb-0">Miembros de la organización</h1>
                <Link to="/organization-members/create" className="button is-primary">
                    Crear miembro
                </Link>
            </div>
            <OrganizationMemberList />
        </div>
    );
};

export default OrganizationMember;