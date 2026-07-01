import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Link } from 'react-router';

type UserCreateFormProps = {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    submit: () => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
};

const UserCreateForm = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    submit,
    isSubmitting,
    error,
}: UserCreateFormProps) => {
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
                <label className="label" htmlFor="firstName">
                    Nombre
                </label>
                <div className="control">
                    <InputText
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="lastName">
                    Apellido
                </label>
                <div className="control">
                    <InputText
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="email">
                    Correo electrónico
                </label>
                <div className="control">
                    <InputText
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="password">
                    Contraseña
                </label>
                <div className="control">
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        inputStyle={{ width: '100%' }}
                        style={{ width: '100%' }}
                        toggleMask
                        feedback={false}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label" htmlFor="confirmPassword">
                    Confirmar contraseña
                </label>
                <div className="control">
                    <Password
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        inputStyle={{ width: '100%' }}
                        style={{ width: '100%' }}
                        toggleMask
                        feedback={false}
                        required
                    />
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <Button
                        type="submit"
                        label="Crear usuario"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="control">
                    <Link to="/users" className="button">
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default UserCreateForm;
