import type { ChangeEvent, SubmitEvent } from 'react';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { MAX_DEDUP_FILES } from '../types/upload';

type DedupUploadFormProps = {
    files: File[];
    selectFiles: (files: File[]) => void;
    clearFiles: () => void;
    fileInputKey: number;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    uploadProgress: number;
    error: string | null;
    successMessage: string | null;
};

const DedupUploadForm = ({
    files,
    selectFiles,
    clearFiles,
    fileInputKey,
    submit,
    isSubmitting,
    uploadProgress,
    error,
    successMessage,
}: DedupUploadFormProps) => {
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
        selectFiles(Array.from(event.target.files ?? []));
    };

    const selectionLabel = files.length === 0
        ? 'Ningún archivo seleccionado'
        : files.length === 1
            ? files[0].name
            : `${files.length} archivos seleccionados`;

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}
            {successMessage && (
                <div className="notification is-success mb-4">{successMessage}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="dedupFiles">
                    Archivos JSON
                </label>
                <div className="control">
                    <div className="file has-name is-fullwidth">
                        <label className="file-label">
                            <input
                                key={fileInputKey}
                                id="dedupFiles"
                                className="file-input"
                                type="file"
                                name="files"
                                multiple
                                accept=".json"
                                disabled={isSubmitting}
                                onChange={handleFilesChange}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="pi pi-upload" />
                                </span>
                                <span className="file-label">Seleccionar JSON</span>
                            </span>
                            <span className="file-name">{selectionLabel}</span>
                        </label>
                    </div>
                </div>
                <p className="help">
                    Hasta {MAX_DEDUP_FILES} archivos .json por solicitud. Se envían juntos y el servidor los procesa después de aceptarlos.
                </p>
                {files.length > 0 && (
                    <ul className="mt-3" style={{ maxHeight: '16rem', overflow: 'auto' }}>
                        {files.map((file, index) => (
                            <li key={`${file.name}-${file.lastModified}-${index}`}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            {isSubmitting && (
                <div className="field">
                    <ProgressBar value={uploadProgress} />
                </div>
            )}

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label={isSubmitting ? 'Subiendo...' : 'Subir archivos'}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
                {files.length > 0 && (
                    <div className="control">
                        <Button
                            type="button"
                            label="Quitar"
                            severity="secondary"
                            disabled={isSubmitting}
                            onClick={clearFiles}
                        />
                    </div>
                )}
            </div>
        </form>
    );
};

export default DedupUploadForm;
