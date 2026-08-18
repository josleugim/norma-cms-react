import type { SubmitEvent } from 'react';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { MAX_OCR_PDF_BYTES } from '../types/upload';

type OcrResolutionsUploadFormProps = {
    file: File | null;
    setFile: (file: File | null) => void;
    fileInputKey: number;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    isProcessing: boolean;
    uploadProgress: number;
    error: string | null;
};

const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const OcrResolutionsUploadForm = ({
    file,
    setFile,
    fileInputKey,
    submit,
    isSubmitting,
    isProcessing,
    uploadProgress,
    error,
}: OcrResolutionsUploadFormProps) => {
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const handleSelect = (event: { files: File[] }) => {
        setFile(event.files[0] ?? null);
    };

    const submitLabel = isProcessing
        ? 'Procesando OCR...'
        : isSubmitting
            ? 'Subiendo...'
            : 'Subir PDF';

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="ocrPdf">
                    Archivo PDF
                </label>
                <div className="control">
                    <FileUpload
                        key={fileInputKey}
                        id="ocrPdf"
                        name="files"
                        accept="application/pdf,.pdf"
                        maxFileSize={MAX_OCR_PDF_BYTES}
                        customUpload
                        multiple={false}
                        disabled={isSubmitting}
                        chooseLabel="Seleccionar PDF"
                        cancelLabel="Quitar"
                        uploadOptions={{ style: { display: 'none' } }}
                        emptyTemplate={
                            <p className="m-0">
                                Arrastra un archivo PDF o selecciónalo. Tamaño máximo: 700 MB.
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

            {isSubmitting && (
                <div className="field">
                    <ProgressBar
                        value={isProcessing ? 100 : uploadProgress}
                        displayValueTemplate={() =>
                            isProcessing ? 'Procesando OCR...' : `${uploadProgress}%`
                        }
                    />
                </div>
            )}

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label={submitLabel}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </form>
    );
};

export default OcrResolutionsUploadForm;
