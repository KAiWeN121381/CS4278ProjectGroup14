import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo from '../assets/logo.png'
import SearchBar from "./SearchBar"

export default function NavBar () {
    return (
        <nav className="nav">
            <CustomLink to='/' className="site-title"><img src={logo} /></CustomLink>
            <SearchBar />
            <ul>
                <CustomLink to='/home'>Home</CustomLink> 
                <CustomLink to='/createpost'>Create Post</CustomLink>
                <CustomLink to='/someotherpage'>Some page</CustomLink>
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