import { Link } from "react-router-dom"

export default function NavBar () {
    return (
        <nav className="nav">
            <Link to='/' className="site-title">VandyLet</Link>
            <ul>
                <CustomLink to='/home'>Home</CustomLink> 
                <CustomLink to='/createpost'>Create Post</CustomLink>
                <CustomLink to='/someotherpage'>Some other page</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink ({to, children, ...props}) {
    const path = window.location.pathname

    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}