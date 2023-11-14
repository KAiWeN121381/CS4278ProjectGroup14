import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [form, setForm] = useState({
    username: "", // The username / ID
    title: "",
    file: null, // The photos
    price: "",

    // Change this to calendar later
    start: "", // Start date
    end: "", // End date

    distance: "",
    address: "",

    // facilities
    pet: false,
    gym: false,
    kitchen: false,

    description: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPost = { ...form };

    await fetch("http://localhost:5050/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      username: "",
      title: "",
      file: null,
      price: "",
      start: "",
      end: "",
      distance: "",
      address: "",
      pet: false,
      gym: false,
      kitchen: false,
      description: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Name </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Photos </label>
          <input
            type="file"
            className="form-control"
            id="photos"
            value={form.file}
            onChange={(e) => updateForm({ file: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price </label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={form.price}
            onChange={(e) => updateForm({ price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start">Start date </label>
          <input
            type="date"
            className="form-control"
            id="start"
            value={form.start}
            onChange={(e) => updateForm({ start: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End Date </label>
          <input
            type="date"
            className="form-control"
            id="end"
            value={form.end}
            onChange={(e) => updateForm({ end: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance </label>
          <input
            type="text"
            className="form-control"
            id="distance"
            value={form.distance}
            onChange={(e) => updateForm({ distance: e.target.value })}
          />{" "}
          Mi
        </div>
        <div className="form-group">
          <label htmlFor="address">Address </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pet">pet</label>
          <input
            type="checkbox"
            className="form-control"
            id="pet"
            checked={form.pet}
            onChange={(e) => updateForm({ pet: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gym">gym</label>
          <input
            type="checkbox"
            className="form-control"
            id="gym"
            checked={form.gym}
            onChange={(e) => updateForm({ gym: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="kitchen">kitchen</label>
          <input
            type="checkbox"
            className="form-control"
            id="kitchen"
            checked={form.kitchen}
            onChange={(e) => updateForm({ kitchen: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
