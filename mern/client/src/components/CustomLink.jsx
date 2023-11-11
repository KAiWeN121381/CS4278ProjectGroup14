import { Link, useMatch, useResolvedPath } from "react-router-dom"

// Creates a self defined link that can apply different formatting options
export default function CustomLink ({to, children, ...props}) {
    // Get the relative pathname for the link
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path : resolvedPath.pathname, end : true})

    return (
        <li className={isActive ? "" : "custom-link"}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}