import logo from "../assets/logo.png";
import menu from "../assets/navbar_menu.png";
import profile from "../assets/navbar_profileicon.png";
import setting from "../assets/navbar_setting.png";

import CustomLink from "./CustomLink";

import React, { useState } from "react";

// The navigation bar at the top of the page.
// Contains links to different pages for navigation
// TO-DO: Create and update links to pages
export default function NavBar () {
    const[slidebar, setSlidebar] = useState(false);

    const toggleMenu = () => setSlidebar(!slidebar);
    const closeMenu = () => setSlidebar(false);

    return (
        <>
            <nav className="nav">
                {/* Temporary links to pages. Replace with the actual corresponding links when pages are created. */}
                <ul>
                    <div className='nav_imgs'>
                        <CustomLink>
                            <button className="menu-button" onClick={toggleMenu}><img src={menu} alt="menu" className='nav_img'/></button> 
                        </CustomLink>
                        <CustomLink to='/settings'>
                            <button className="menu-button" onClick={closeMenu}><img src={setting} alt="settings" className='nav_img'/></button>
                        </CustomLink>
                    </div>
                    
                    <CustomLink to='/' ><img src={logo} alt="logo" className="site-title" /></CustomLink>
                    <CustomLink to='/login'>
                            <button className="menu-button" style={{position:"absolute", right:"0.8vw", marginTop:"8vh"}} onClick={closeMenu}><img src={profile} alt="profile" className='nav_img'/></button>
                    </CustomLink>
                    {/* <CustomLink to='/createpost'>
                        <button className='make-post-button' style={{position:"absolute", right:"0", marginTop:"7vh"}}>Make a Post</button>
                    </CustomLink> */}
                </ul>
            </nav>
            <nav className={slidebar ? 'menu active' : 'menu'}>
                <ul className='menu-items' onClick={toggleMenu}>
                    <button className='cancel-button' style={{ marginLeft:"75%", color:'white'}}>X</button>
                    <CustomLink to='/'><p style={{color:'white'}}>Homepage</p></CustomLink>
                    <CustomLink to='/report'><p style={{color:'white'}}>Report</p></CustomLink>
                </ul>
            </nav>
        </> 
    )    
}
