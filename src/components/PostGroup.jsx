import { useState } from "react";
import Post from "./Post";
import * as React from 'react';;
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function PostGroup() {
    let posts = [
        <Post title="Title 1" text="text 1"/>,
        <Post title="Title 2" text="text 2"/>,
        <Post title="Title 3" text="text 3"/>,
        <Post title="Title 4" text="text 4"/>,
        <Post title="Title 5" text="text 5"/>,
        <Post title="Title 6" text="text 6"/>
    ];

    const [selectedIndex, setSelectedIndex] = useState(-1);

    return ( 
    <Box sx={{flexGrow: 1}}>
        {posts.length === 0 && <h1>No posts are found</h1>}
        <Grid container spacing={0.5}>
            {posts.map((post, index) => (
                <Grid item xs={4} key={index}>
                    {post}
                </Grid>
            ))}
        </Grid>
    </Box>)
}