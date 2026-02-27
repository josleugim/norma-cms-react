import { Link } from "react-router";

const Menu = () => {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )
}

export default Menu;