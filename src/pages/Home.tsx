import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user, organization } = useAuth();

    return (
        <div>
            <h1>Home</h1>
            <p>Hola, {user?.firstName}</p>
            <p>Organización: {organization?.name}</p>
        </div>
    );
};

export default Home;
