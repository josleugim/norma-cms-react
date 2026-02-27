import useLogin from '../../hooks/useLogin';

const Login = () => {
    const { login} = useLogin();
    const onLoginAction = async (formData: FormData) => {
        await login({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        });
    }
    return (
        <form action={onLoginAction}>
            <div className="field">
                <label className="label">Correo electrónico</label>
                <div className="control">
                    <input className="input" name="email" type="email" placeholder="correo@ejemplo.com" />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" name="password" type="password" placeholder="Password" />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary">Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login;