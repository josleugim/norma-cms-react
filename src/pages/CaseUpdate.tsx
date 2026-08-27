import { useParams } from 'react-router';
import CaseUpdateForm from '../components/cases/CaseUpdateForm';
import useUpdateCase from '../hooks/useUpdateCase';

const CaseUpdate = () => {
    const { id } = useParams();
    const caseId = Number(id);
    const updateCase = useUpdateCase(caseId);

    if (Number.isNaN(caseId)) {
        return <div className="notification is-danger">ID inválido</div>;
    }

    if (updateCase.isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1 className="title">Modificar caso</h1>
            <CaseUpdateForm caseId={caseId} {...updateCase} />
        </div>
    );
};

export default CaseUpdate;
