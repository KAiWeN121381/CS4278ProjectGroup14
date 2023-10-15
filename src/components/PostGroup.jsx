import { useState } from "react";
import PostPreview from "./PostPreview";
import * as React from 'react';
import {Post} from "./Post";

export default function PostGroup() {
    let posts = [
        Post("Title 1"),
        Post("Title 2"),
        Post("Title 3"),
        Post("Title 4"),
        Post("Title 5"),
        Post("Title 6"),
        Post("Title 7"),
        Post("Title 8"),
        Post("Title 9")
    ];

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return ( 
    <div className="grid-container">
        {posts.length === 0 && <h1>No posts are found</h1>}
        {posts.map((post, index) => (
            <div className="grid-item">
                <PostPreview post={post}/>
            </div>
        ))}
    </div>)
}