import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://anchorlease.space:5050/users/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert(`User with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(user);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function cancelEdit() {
    navigate(-1);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      post: form.post,
    };

    // This will send a post request to update the data in the database.
    await fetch(`https://anchorlease.space:5050/users/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Profile</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="hidden"
            className="form-control"
            id="email"
            value={form.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Profile"
            className="btn btn-primary"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
