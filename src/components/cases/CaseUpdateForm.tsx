import type { Case } from '../../types/case';
import type * as React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router';

type CaseUpdateFormProps = {
    cases: Case[];
    caseId: number;
    parentId: number | null;
    setParentId: (value: number | null) => void;
    name: string;
    setName: (value: string) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const CaseUpdateForm = ({
    cases,
    caseId,
    parentId,
    setParentId,
    name,
    setName,
    submit,
    isSubmitting,
    error,
}: CaseUpdateFormProps) => {
    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    const caseOptions = [
        { label: 'Sin caso padre', value: null },
        ...cases
            .filter((_case: Case) => _case.id !== caseId)
            .map((_case: Case) => ({
                label: _case.name ?? _case.caseLink,
                value: _case.id,
            })),
    ];

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="parentId">
                    Caso padre
                </label>
                <div className="control">
                    <Dropdown
                        id="parentId"
                        value={parentId}
                        options={caseOptions}
                        optionLabel="label"
                        optionValue="value"
                        onChange={(e) => setParentId(e.value)}
                        placeholder="Selecciona un caso padre"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="name">Nombre del caso</label>
                <div className="control">
                    <InputText
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
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
                    <Link to="/cases" className="button">
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CaseUpdateForm;
