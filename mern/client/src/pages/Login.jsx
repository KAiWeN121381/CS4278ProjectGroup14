import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("")

    handleChange = (e) => {
        let userEmail = e.value;
        setEmail(userEmail);
    }

    handleSubmit = (e) => {
        // login stuff here
    }

    return (
        <div>
            <h3>Email :</h3> {" "}
            <input type="email" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
        )
}