import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo from '../assets/logo.png'
import menu from '../assets/navbar_menu.png'
import profile from '../assets/navbar_profileicon.png'
import setting from '../assets/navbar_setting.png'
import SearchBar from "./SearchBar"

export default function NavBar () {
    return (
        <nav className="nav">
            <ul>
                <CustomLink to='/'><img src={menu} className='nav_img'/></CustomLink> 
                <CustomLink to='/createpost'><img src={profile} className='nav_img'/></CustomLink>
                <CustomLink to='/someotherpage'><img src={setting} className='nav_img'/></CustomLink>
            </ul>
            <CustomLink to='/' className="site-title"><img src={logo} /></CustomLink>

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