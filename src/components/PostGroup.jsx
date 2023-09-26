import { useState } from "react";
import Post from "./Post";

export default function PostGroup() {
    let posts = [
        <Post title="Title 1" text="text 1"/>,
        <Post title="Title 2" text="text 2"/>,
        <Post title="Title 3" text="text 3"/>,
        <Post title="Title 4" text="text 4"/>
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
                    key={index} // change to key={post.id} later when implemented
                    onClick={() => {setSelectedIndex(index);}}
                >
                    {post}
                </li>
            ))}
        </ul>
    </>)
}