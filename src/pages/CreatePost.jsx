import React, {useState} from "react";

export default function CreatePost() {

    const [info, setInfo] = useState({
        name: "",
        title: "",
        file: null,
        description: "",
    })

    const handleChange = (changeEvent) => {
        const {name, value} = changeEvent.target;
        setInfo((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Name :</h3> {" "} 
            <input type="text" name="name" onChange={handleChange} />
            <h3>Title of post :</h3> {" "} 
            <input type="text" name="title" onChange={handleChange} />
            <h3>Upload Photo :</h3> {" "} 
            <input type="file" name="file" onChange={handleChange} />
            <h3>Post Description :</h3> {" "} 
            <textarea name="description" onChange={handleChange} />
            
            <button type="submit"> Create Post! </button>
        </form>
    )
}