import PostPreview from "./PostPreview";
import React, { useEffect, useState } from "react";
import {Post} from "./Post";

export default function PostGroup() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
    async function getRecords() {
        const response = await fetch(`http://localhost:5050/post/`);

        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }

        const records = await response.json();
        setRecords(records);
    }

    getRecords();

    return;
    }, [records.length]);

    return ( 
    <div className="grid-container">
        {records.length === 0 && <h1>No posts are found</h1>}
        {records.map((record) => (
            <div className="grid-item">
                <PostPreview post={Post(record.title, record._id)}/>
            </div>
        ))}
    </div>)
}