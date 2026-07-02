import OrganizationMemberCreateForm from '../components/OrganizationMemberCreateForm';
import useCreateOrganizationMember from '../hooks/useCreateOrganizationMember';

const OrganizationMemberCreate = () => {
    const createMember = useCreateOrganizationMember();

    return (
        <div>
            <h1 className="title">Agregar miembro</h1>
            <OrganizationMemberCreateForm {...createMember} />
        </div>
    );
};

export default OrganizationMemberCreate;
