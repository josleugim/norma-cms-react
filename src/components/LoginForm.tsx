import { useState } from 'react';
import styles from './LoginForm.module.css';

type LoginFormProps = {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
};

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit, isLoading }: LoginFormProps) => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (value: string) => {
        if (!value) return 'El correo electrónico es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un correo electrónico válido';
        return '';
    };

    const validatePassword = (value: string) => {
        if (!value) return 'La contraseña es requerida';
        return '';
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (emailError) setEmailError(validateEmail(value));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (passwordError) setPasswordError(validatePassword(value));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) return;

        onSubmit();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <img
                        src="https://norma-public-assets.s3.mx-central-1.amazonaws.com/norma-logo.png"
                        alt="Norma+"
                    />
                </div>

                <h1 className={styles.title}>
                    Inicia sesión en tu cuenta
                </h1>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.field}>
                        <label className={styles.label}>Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={() => setEmailError(validateEmail(email))}
                            placeholder="tu@correo.com"
                            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                        />
                        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onBlur={() => setPasswordError(validatePassword(password))}
                            placeholder="••••••••"
                            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                        />
                        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
