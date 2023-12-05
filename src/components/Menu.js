export default function Menu({currentPage}) {
    console.log(currentPage)
    return (
        <nav>
            <ul className="navigation">
                <li className="item brand"> Music Find </li>
                <li className="item"><a href="/" className={(currentPage === "/") ? "link active" : "link"}>Home</a></li>
                <li className="item"><a href="/search" className={(currentPage === "/search") ? "link active" : "link"}>Search</a></li>
            </ul>
            <ul className="nav_actions">
                <li className="item">Login</li>
            </ul>
        </nav>
    )
}