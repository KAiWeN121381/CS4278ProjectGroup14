import { useState } from "react";
import Post from "./Post";
import * as React from 'react';;

export default function PostGroup() {
    let posts = [
        <Post title="Title 1" text="text 1"/>,
        <Post title="Title 2" text="text 2"/>,
        <Post title="Title 3" text="text 3"/>,
        <Post title="Title 4" text="text 4"/>,
        <Post title="Title 5" text="text 5"/>,
        <Post title="Title 6" text="text 6"/>,
        <Post title="Title 7" text="text 7"/>,
        <Post title="Title 8" text="text 8"/>,
        <Post title="Title 9" text="text 9"/>,
        <Post title="Title 10" text="text 10"/>,
        <Post title="Title 11" text="text 11"/>,
        <Post title="Title 12" text="text 12"/>
    ];

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return ( 
    <div className="grid-container">
        {posts.length === 0 && <h1>No posts are found</h1>}
        {posts.map((post, index) => (
            <div className="grid-item">
                {post}
            </div>
        ))}
    </div>)
}