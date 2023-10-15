import React, {useState} from "react";

export default function CreatePost() {

    const [info, setInfo] = useState({
        name: "",
        start: "",
        end: "",
        title: "",
        file: null,
        description: "",
        price: ""
    })

    const handleChange = (changeEvent) => {
        const {name, value} = changeEvent.target;
        setInfo((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add to database here
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Username :</h3> {" "} 
            <input type="text" name="name" onChange={handleChange} />
            <h3>Start date :</h3> {" "} 
            <input type="text" name="start" onChange={handleChange} placeholder="MM/DD/YYYY" />
            <h3>End date :</h3> {" "} 
            <input type="text" name="end" onChange={handleChange} placeholder="MM/DD/YYYY" />
            <h3>Rent per month :</h3> {" "} 
            <input type="text" name="price" onChange={handleChange} />
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