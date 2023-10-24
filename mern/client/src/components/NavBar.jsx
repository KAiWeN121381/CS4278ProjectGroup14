import logo from '../assets/logo.png'
import menu from '../assets/navbar_menu.png'
import profile from '../assets/navbar_profileicon.png'
import setting from '../assets/navbar_setting.png'

import CustomLink from "./CustomLink"

// The navigation bar at the top of the page.
// Contains links to different pages for navigation
// TO-DO: Create and update links to pages
export default function NavBar () {
    return (
        <nav className="nav">
            {/* Temporary links to pages. Replace with the actual corresponding links when pages are created. */}
            <ul>
                <CustomLink to='/'><img src={menu} className='nav_img'/></CustomLink> 
                <CustomLink to='/createpost'><img src={profile} className='nav_img'/></CustomLink>
                {/* A temporary link to a certain post for edit; replace with /edit/:id when fully connected to DB */}
                <CustomLink to='/edit/65383380c9658441dcfb6b28'><img src={setting} className='nav_img'/></CustomLink>
            </ul>
            <CustomLink to='/' className="site-title"><img src={logo} /></CustomLink>
        </nav>
    )
}