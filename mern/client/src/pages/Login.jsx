import React, { useEffect, useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        let userEmail = e.target.value;
        setEmail(userEmail);
    }

    const handleSubmit = (e) => {
        console.log(email)
        // Login stuff here
        // email information is the variable    email
    }

    return (
        <div>
            <h3>Email :</h3> {" "}
            <input type="email" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
        )
}