import { useNavigate } from 'react-router';
import useCases from "../../hooks/useCases";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Case } from "../../types/case";

const CaseList = () => {
    const navigate = useNavigate();
    const {
        items,
        first,
        rows,
        totalRecords,
        rowsPerPageOptions,
        onPageChange,
        isLoading,
        error,
    } = useCases();

    const handleEdit = (caseItem: Case) => {
        navigate(`/cases/${caseItem.id}/edit`);
    };

    const optionsBody = (caseItem: Case) => (
        <Button
            className="button is-small is-link"
            label="Modificar"
            size="small"
            onClick={() => handleEdit(caseItem)}
        />
    );

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <div>
            <DataTable
                value={items}
                lazy
                paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={rowsPerPageOptions}
                onPage={onPageChange}
                loading={isLoading}
                emptyMessage="No hay casos para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="id" header="ID" style={{ width: '3rem' }} />
                <Column field="name" header="Nombre" />
                <Column field="caseLink" header="Vínculo" />
                <Column field="resolutionDate" header="Fecha resolución" />
                <Column header="Opciones" body={optionsBody} style={{ width: '8rem' }} />
            </DataTable>
        </div>
    );
};

export default CaseList;