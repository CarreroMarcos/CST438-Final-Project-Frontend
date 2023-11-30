import { Link, useNavigate } from "react-router-dom";

export default function Menu({currentPage}) {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('jwt');
        navigate("/")
    }

    return (
        <nav>
            <ul className="navigation">
                <li className="item brand"> Music Find </li>
                <li className="item"><Link to="/" className={(currentPage === "home") ? "link active" : "link"}>Home</Link></li>
                <li className="item"><Link to="/search" className={(currentPage === "search") ? "link active" : "link"}>Search</Link></li>
            </ul>
            <ul className="nav_actions">
                <li className="item">
                    {(sessionStorage.getItem("jwt")) ? <Link to="/library" className={(currentPage === "library") ? "link active" : "link"}>Your Library</Link>  :<Link to="/login" className="link">Login</Link>}
                </li>
                {(sessionStorage.getItem('jwt')) ? <li className="item">
                    <a href="" className="link" onClick={logout}>Logout</a>
                </li> : <></>}
            </ul>
        </nav>
    )
}