import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import type { Paragraph } from '../types/paragraph';
import useParagraphs from '../hooks/useParagraphs';

const ParagraphList = () => {
    const {
        items,
        first,
        rows,
        totalRecords,
        rowsPerPageOptions,
        onPageChange,
        caseLink,
        caseLinkInput,
        setCaseLinkInput,
        applyCaseLinkFilter,
        clearCaseLinkFilter,
        isLoading,
        error,
    } = useParagraphs();

    const titlesBody = (paragraph: Paragraph) => paragraph.titles.join(', ');

    const statusBody = (paragraph: Paragraph) => (
        <Tag
            value={paragraph.isActive ? 'Activo' : 'Inactivo'}
            severity={paragraph.isActive ? 'success' : 'danger'}
        />
    );

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <div>
            <div className="field is-grouped mb-4">
                <div className="control is-expanded">
                    <InputText
                        value={caseLinkInput}
                        onChange={(event) => setCaseLinkInput(event.target.value)}
                        placeholder="Filtrar por caseLink (ej. VCN-001-2017)"
                        className="w-full"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                applyCaseLinkFilter(caseLinkInput);
                            }
                        }}
                    />
                </div>
                <div className="control">
                    <Button label="Buscar" onClick={() => applyCaseLinkFilter(caseLinkInput)} />
                </div>
                {caseLink && (
                    <div className="control">
                        <Button label="Limpiar" severity="secondary" onClick={clearCaseLinkFilter} />
                    </div>
                )}
            </div>

            {caseLink && (
                <p className="mb-3">
                    Filtrando por: <strong>{caseLink}</strong>
                </p>
            )}

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
                emptyMessage="No hay criterios para mostrar"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="id" header="ID" style={{ width: '5rem' }} />
                <Column field="caseLink" header="Case link" style={{ width: '10rem' }} />
                <Column field="content" header="Contenido" />
                <Column header="Títulos" body={titlesBody} style={{ width: '12rem' }} />
                <Column header="Estado" body={statusBody} style={{ width: '8rem' }} />
            </DataTable>
        </div>
    );
};

export default ParagraphList;
