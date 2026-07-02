import { Link, useNavigate } from 'react-router';
import { logout } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
    const navigate = useNavigate();
    const { user, membership, isAuthenticated, isLoading, clearSession } = useAuth();

    const isAdmin = membership?.roles.some((role) => role.code === 'admin') ?? false;

    const handleLogout = async () => {
        await logout();
        clearSession();
        navigate('/login');
    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img
                        src="https://norma-public-assets.s3.mx-central-1.amazonaws.com/norma-logo.png"
                        alt="Norma+"
                        style={{ height: '60px', maxHeight: 'none' }}
                    />
                </Link>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {isAuthenticated && (
                        <>
                            <Link className="navbar-item" to="/">Home</Link>
                            <Link className="navbar-item" to="/resolutions">Resolutions</Link>
                            <Link className="navbar-item" to="/criteria">Criterios</Link>
                            {isAdmin && (
                                <>
                                    <Link className="navbar-item" to="/organizations">Organizaciones</Link>
                                    <Link className="navbar-item" to="/roles">Roles</Link>
                                    <Link className="navbar-item" to="/users">Usuarios</Link>
                                    <Link className="navbar-item" to="/organization-members">Miembros de la organización</Link>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="navbar-end">
                    {!isLoading && isAuthenticated && (
                        <>
                            <span className="navbar-item">{user?.firstName}</span>
                            <div className="navbar-item">
                                <button type="button" className="button is-light" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                    {!isLoading && !isAuthenticated && (
                        <>
                            <Link className="navbar-item" to="/login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Menu;
