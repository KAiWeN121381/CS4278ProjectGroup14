import { useState } from "react";
import Post from "./Post";

export default function PostGroup() {
    let posts = [
        <Post />,
        <Post />,
        <Post />,
        <Post />
    ];

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return ( 
    <>
        {posts.length === 0 && <h1>No posts are found</h1>}
        <ul className="list-group">
            {posts.map((post, index) => (
                <li 
                    className= {
                        selectedIndex === index
                            ? "list-group-item active"
                            : "list-group-item"
                        } 
                    key={post} // change to key={post.id} later when implemented
                    onClick={() => {setSelectedIndex(index);}}
                >
                    {post}
                </li>
            ))}
        </ul>
    </>)
}