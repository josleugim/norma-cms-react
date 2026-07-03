import useLogin from '../hooks/useLogin';


const Login = () => {
    const { login } = useLogin();

    const onLoginAction = async (formData: FormData) => {
        await login({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        });
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#f4f4f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '40px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                margin: '0 16px',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <img
                        src="https://norma-public-assets.s3.mx-central-1.amazonaws.com/norma-logo.png"
                        alt="Norma+"
                        style={{ height: '56px', maxHeight: 'none' }}
                    />
                </div>

                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '28px',
                    color: '#111',
                    lineHeight: 1.3,
                }}>
                    Inicia sesión en tu cuenta
                </h1>

                <form action={onLoginAction}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem', color: '#374151' }}>
                            Correo electrónico
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                color: '#111',
                                outline: 'none',
                                boxSizing: 'border-box',
                                backgroundColor: 'white',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.9rem', color: '#374151' }}>
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                color: '#111',
                                outline: 'none',
                                boxSizing: 'border-box',
                                backgroundColor: 'white',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#111',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            letterSpacing: '0.01em',
                        }}
                    >
                        Iniciar sesión
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
