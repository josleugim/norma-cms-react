import type { SubmitEvent } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { MAX_LANDING_AI_JSON_BYTES } from '../types/upload';

type LandingAiUploadFormProps = {
    file: File | null;
    setFile: (file: File | null) => void;
    fileInputKey: number;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const LandingAiUploadForm = ({
    file,
    setFile,
    fileInputKey,
    submit,
    isSubmitting,
    error,
}: LandingAiUploadFormProps) => {
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const handleSelect = (event: { files: File[] }) => {
        setFile(event.files[0] ?? null);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="landingAiFile">
                    Archivo
                </label>
                <div className="control">
                    <FileUpload
                        key={fileInputKey}
                        id="landingAiFile"
                        name="files"
                        accept="application/json,.json"
                        maxFileSize={MAX_LANDING_AI_JSON_BYTES}
                        customUpload
                        multiple={false}
                        disabled={isSubmitting}
                        chooseLabel="Seleccionar JSON"
                        cancelLabel="Quitar"
                        uploadOptions={{ style: { display: 'none' } }}
                        emptyTemplate={
                            <p className="m-0">
                                Arrastra un archivo JSON o selecciónalo. Tamaño máximo: 700 MB.
                            </p>
                        }
                        invalidFileSizeMessageSummary="Archivo demasiado grande"
                        invalidFileSizeMessageDetail="El tamaño máximo permitido es 700 MB."
                        onSelect={handleSelect}
                        onClear={() => setFile(null)}
                        onRemove={() => setFile(null)}
                    />
                </div>
                {file && (
                    <p className="help">
                        Seleccionado: {file.name} ({formatFileSize(file.size)})
                    </p>
                )}
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label={isSubmitting ? 'Subiendo...' : 'Subir archivo'}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </form>
    );
};

export default LandingAiUploadForm;
