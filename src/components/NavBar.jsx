export default function NavBar () {
    return (
        <nav className="nav">
            <a href='/' className="site-title">VandyLet</a>
            <ul>
                <li> <a href='/home'>Home</a> </li>
                <li> <a href='/createpost'>Create Post</a> </li> 
                <li> <a href='/someotherpage'>Some other page</a> </li>
            </ul>
        </nav>
    )
}