import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Access by changing website address to https://anchorlease.space:3000/newprofile

export default function CreateProfile() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`https://anchorlease.space:5050/users/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      setUsers(users);
    }

    getUsers();

    return;
  }, [users.length]);

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

    await fetch("https://anchorlease.space:5050/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setInfo({
      name: "",
      email: "",
      phone: "",
    });

    async function getUsers() {
      const response = await fetch(`https://anchorlease.space:5050/users/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json();
      setUsers(users);
    }

    getUsers();

    let tempUsers = users.filter((user) => user.email === info.email);
    if (tempUsers.length !== -1) {
      sessionStorage.setItem("userID", String(tempUsers[0]._id));
    }

    navigate("/");
  }

  return (
    <div>
      <h3>Create Profile</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={info.name}
            onChange={(e) => updateInfo({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phone">Phone Number</label>
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
