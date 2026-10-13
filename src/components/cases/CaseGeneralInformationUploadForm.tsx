import type { ChangeEvent, SubmitEvent } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import {
    MAX_CASE_GENERAL_INFORMATION_CSV_BYTES,
    type CaseGeneralInformationSkippedRow,
    type CaseGeneralInformationUploadResponse,
} from '../../types/case';

type CaseGeneralInformationUploadFormProps = {
    file: File | null;
    selectFile: (file: File | null) => void;
    clearFile: () => void;
    fileInputKey: number;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
    result: CaseGeneralInformationUploadResponse | null;
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const caseLinkBody = (row: CaseGeneralInformationSkippedRow) => row.caseLink ?? '—';

const CaseGeneralInformationUploadForm = ({
    file,
    selectFile,
    clearFile,
    fileInputKey,
    submit,
    isSubmitting,
    error,
    result,
}: CaseGeneralInformationUploadFormProps) => {
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        selectFile(event.target.files?.[0] ?? null);
    };

    const updated = result?.updated ?? 0;
    const skippedCount = result?.skipped.length ?? 0;
    const updatedText = updated === 1 ? 'Se actualizó 1 caso' : `Se actualizaron ${updated} casos`;
    const skippedText = skippedCount === 1 ? 'se omitió 1 fila' : `se omitieron ${skippedCount} filas`;

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="caseGeneralInformationCsv">
                    Archivo CSV
                </label>
                <div className="control">
                    <div className="file has-name is-fullwidth">
                        <label className="file-label">
                            <input
                                key={fileInputKey}
                                id="caseGeneralInformationCsv"
                                className="file-input"
                                type="file"
                                name="file"
                                accept=".csv"
                                disabled={isSubmitting}
                                onChange={handleFileChange}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="pi pi-upload" />
                                </span>
                                <span className="file-label">Seleccionar CSV</span>
                            </span>
                            <span className="file-name">
                                {file
                                    ? `${file.name} (${formatFileSize(file.size)})`
                                    : 'Ningún archivo seleccionado'}
                            </span>
                        </label>
                    </div>
                </div>
                <div className="content is-small mt-3">
                    <p>
                        Reglas del CSV. Un solo archivo .csv de hasta {MAX_CASE_GENERAL_INFORMATION_CSV_BYTES / (1024 * 1024)} MB.
                    </p>
                    <ul>
                        <li>La primera fila es el encabezado.</li>
                        <li>
                            «Nombre de resolución» es obligatoria. Es la clave de búsqueda y debe coincidir con el caseLink del caso. Esa columna no se actualiza.
                        </li>
                        <li>Solo se actualizan las columnas presentes en el archivo. Una celda vacía deja ese campo en null.</li>
                        <li>
                            Una fila se omite si el caso no existe, un valor no se puede interpretar o no se puede resolver el caso padre. El resto del archivo sí se actualiza.
                        </li>
                        <li>Las fechas usan el formato dd/mm/yyyy.</li>
                        <li>Las columnas de lista van separadas por comas dentro de una celda entre comillas.</li>
                        <li>
                            Estas tres columnas son JSON dentro de una celda entre comillas:
                            <ul>
                                <li>
                                    «Agentes multas»: objeto de nombre del agente a multa, por ejemplo{' '}
                                    <code>{'{"Panasonic Corporation": "$1400000.00", "Ficosa Inversión, S.L": "$1400000.00"}'}</code>
                                </li>
                                <li>
                                    «Funcionarios de la decisión»: arreglo de{' '}
                                    <code>{'{"nombre","rol","rol_literal"}'}</code>
                                </li>
                                <li>
                                    «Votos particulares y concurrentes»: arreglo de{' '}
                                    <code>{'{"nombre","posicion"}'}</code>
                                </li>
                            </ul>
                        </li>
                        <li>
                            «Expediente administrativo de origen» es el caseLink del caso padre. Una celda vacía quita el padre.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label={isSubmitting ? 'Subiendo...' : 'Subir CSV'}
                        loading={isSubmitting}
                        disabled={isSubmitting || !file}
                    />
                </div>
                {file && (
                    <div className="control">
                        <Button
                            type="button"
                            label="Quitar"
                            severity="secondary"
                            disabled={isSubmitting}
                            onClick={clearFile}
                        />
                    </div>
                )}
            </div>

            {result && (
                <div className="box mt-5">
                    <div className={`notification ${skippedCount > 0 ? 'is-warning' : 'is-success'}`}>
                        {updatedText}; {skippedText}.
                    </div>
                    {skippedCount > 0 && (
                        <DataTable
                            value={result.skipped}
                            dataKey="row"
                            paginator={skippedCount > 10}
                            rows={10}
                            emptyMessage="No se omitió ninguna fila"
                        >
                            <Column field="row" header="Fila" style={{ width: '6rem' }} />
                            <Column field="caseLink" header="Nombre de resolución" body={caseLinkBody} />
                            <Column field="reason" header="Motivo" />
                        </DataTable>
                    )}
                </div>
            )}
        </form>
    );
};

export default CaseGeneralInformationUploadForm;
