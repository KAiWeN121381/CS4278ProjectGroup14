import React, {useState} from "react";
import { useNavigate } from "react-router";

// Access by changing website address to http://localhost:3000/newprofile

export default function CreateProfile() {
    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: ""
    })

    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateInfo(value) {
        return setInfo((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newUser = { ...info };

        // CHANGE THIS
        await fetch("http://localhost:5050/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setInfo({ firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "" });
        navigate("/");
    }

    return (
        <div>
          <h3>Create Profile</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={info.firstName}
                        onChange={(e) => updateInfo({ firstName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={info.lastName}
                        onChange={(e) => updateInfo({ lastName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={info.username}
                        onChange={(e) => updateInfo({ username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input
                        type="email"
                        placeholder=""
                        className="form-control"
                        id="email"
                        value={info.email}
                        onChange={(e) => updateInfo({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                        placeholder="1234567890"
                        value={info.phone}
                        onChange={(e) => updateInfo({ phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create user"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
      );
}