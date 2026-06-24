import { useParams } from 'react-router';
import ParagraphForm from '../components/ParagraphForm';
import useEditParagraph from '../hooks/useEditParagraph';

const ParagraphEdit = () => {
    const { id } = useParams();
    const paragraphId = Number(id);
    const edit = useEditParagraph(paragraphId);

    if (Number.isNaN(paragraphId)) {
        return <div className="notification is-danger">ID inválido</div>;
    }

    if (edit.isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1 className="title">Modificar criterio</h1>
            <ParagraphForm {...edit} />
        </div>
    );
};

export default ParagraphEdit;
