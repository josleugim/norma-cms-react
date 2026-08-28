import type { Case } from '../../types/case';
import type * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AutoComplete, type AutoCompleteChangeEvent, type AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router';

type CaseOption = {
    id: number | null;
    label: string;
};

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

    const allOptions = useMemo<CaseOption[]>(
        () =>
            cases
                .filter((_case: Case) => _case.id !== caseId)
                .map((_case: Case) => ({
                    id: _case.id,
                    label: `${_case.caseLink}${_case.name ? ` - ${_case.name}` : ''}`,
                })),
        [cases, caseId]
    );

    const [suggestions, setSuggestions] = useState<CaseOption[]>(allOptions);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setSuggestions(allOptions);
    }, [allOptions]);

    useEffect(() => {
        const selected = allOptions.find((option) => option.id === parentId);
        setInputValue(selected?.label ?? '');
    }, [allOptions, parentId]);

    const handleSearch = (event: AutoCompleteCompleteEvent) => {
        const query = event.query.toLowerCase();
        setSuggestions(
            query
                ? allOptions.filter((option) => option.label.toLowerCase().includes(query))
                : allOptions
        );
    };

    const handleChange = (event: AutoCompleteChangeEvent) => {
        if (typeof event.value === 'string') {
            setInputValue(event.value);
            return;
        }

        const option = event.value as CaseOption | null;
        if (option) {
            setInputValue(option.label);
            setParentId(option.id);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setParentId(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger mb-4">{error}</div>
            )}

            <div className="field">
                <label className="label" htmlFor="parentId">
                    Caso padre
                </label>
                <div className="field is-grouped">
                    <div className="control is-expanded">
                        <AutoComplete
                            id="parentId"
                            value={inputValue}
                            suggestions={suggestions}
                            field="label"
                            dropdown
                            delay={200}
                            onChange={handleChange}
                            completeMethod={handleSearch}
                            placeholder="Busca o selecciona un caso padre"
                            style={{ width: '100%' }}
                            emptyMessage="No se encontraron casos"
                        />
                    </div>
                    {parentId !== null && (
                        <div className="control">
                            <Button
                                type="button"
                                label="Limpiar"
                                severity="secondary"
                                onClick={handleClear}
                            />
                        </div>
                    )}
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
