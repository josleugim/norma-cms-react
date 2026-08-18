import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { LandingAiFile } from '../types/landing-ai';
import useLandingAiFiles from '../hooks/useLandingAiFiles';

const fileNameFromKey = (key: string) => key.split('/').pop() || key;

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const LandingAiFileList = () => {
    const { files, isLoading, error, downloadFile, downloadingKey } = useLandingAiFiles();

    const nameBody = (file: LandingAiFile) => fileNameFromKey(file.key);

    const sizeBody = (file: LandingAiFile) => formatFileSize(file.size);

    const lastModifiedBody = (file: LandingAiFile) => {
        if (!file.lastModified) {
            return '—';
        }

        return new Date(file.lastModified).toLocaleString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const optionsBody = (file: LandingAiFile) => (
        <Button
            className="button is-small is-link"
            icon="pi pi-download"
            label="Descargar"
            size="small"
            loading={downloadingKey === file.key}
            disabled={downloadingKey !== null}
            onClick={() => downloadFile(file)}
        />
    );

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    return (
        <DataTable
            value={files}
            dataKey="key"
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            loading={isLoading}
            emptyMessage="No hay archivos para mostrar"
            tableStyle={{ minWidth: '50rem' }}
        >
            <Column header="Archivo" body={nameBody} />
            <Column field="key" header="Ruta" />
            <Column header="Tamaño" body={sizeBody} style={{ width: '8rem' }} />
            <Column header="Modificado" body={lastModifiedBody} style={{ width: '12rem' }} />
            <Column header="Opciones" body={optionsBody} style={{ width: '10rem' }} />
        </DataTable>
    );
};

export default LandingAiFileList;
