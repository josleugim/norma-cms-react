import type { SubmitEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import type { DigitalResolutionEmbeddingResponse } from '../types/digital-resolution';

type DigitalResolutionEmbeddingFormProps = {
    caseLink: string;
    setCaseLink: (value: string) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
    result: DigitalResolutionEmbeddingResponse | null;
};

const DigitalResolutionEmbeddingForm = (
    { caseLink, setCaseLink, submit, isSubmitting, error, result }: DigitalResolutionEmbeddingFormProps
) => {
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="notification is-danger mb-4">{error}</div>}
            {result && (
                <div className="notification is-success mb-4">
                    Embedding solicitado para {result.caseLink}. Estado: {result.status}
                </div>
            )}
            <div className="field">
                <label className="label" htmlFor="caseLink">
                    Caso
                </label>
                <div className="control">
                    <InputText type="text" value={caseLink} onChange={(e) => setCaseLink(e.target.value)} />
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <Button className="button is-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Generando embedding...' : 'Generar embedding'}</Button>
                </div>
            </div>
        </form>
    );
};

export default DigitalResolutionEmbeddingForm;