import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link } from 'react-router';

type ParagraphFormProps = {
    content: string;
    isActive: boolean;
    setContent: (value: string) => void;
    setIsActive: (value: boolean) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const ParagraphForm = ({
    content,
    isActive,
    setContent,
    setIsActive,
    submit,
    isSubmitting,
    error,
}: ParagraphFormProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="content">
                    Contenido
                </label>
                <div className="control">
                    <InputTextarea
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        rows={8}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(event) => setIsActive(event.target.checked)}
                    />
                    {' '}Activo
                </label>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label="Guardar"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="control">
                    <Link to="/criteria" className="button">
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default ParagraphForm;
