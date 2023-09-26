import { Link, useMatch, useResolvedPath } from "react-router-dom"

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
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path : resolvedPath.pathname, end : true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}