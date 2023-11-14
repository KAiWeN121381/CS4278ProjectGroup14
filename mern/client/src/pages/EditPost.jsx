import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditPost() {
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

    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString(); // This is undefined
      const response = await fetch(
        `http://172.31.23.255:5050/posts/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
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

  async function onSubmit(e) {
    e.preventDefault();
    const editedPost = {
      username: form.username,
      title: form.title,
      file: form.file,
      price: form.price,

      start: form.start,
      end: form.end,

      distance: form.distance,
      address: form.address,

      pet: form.pet,
      gym: form.gym,
      kitchen: form.kitchen,

      description: form.description,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://172.31.23.255:5050/posts/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Edit Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Photos</label>
          <input
            type="file"
            className="form-control"
            id="photos"
            value={form.file}
            onChange={(e) => updateForm({ file: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={form.price}
            onChange={(e) => updateForm({ price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start">Start date</label>
          <input
            type="date"
            className="form-control"
            id="start"
            value={form.start}
            onChange={(e) => updateForm({ start: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End</label>
          <input
            type="date"
            className="form-control"
            id="end"
            value={form.end}
            onChange={(e) => updateForm({ end: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Distance</label>
          <input
            type="text"
            className="form-control"
            id="distance"
            value={form.distance}
            onChange={(e) => updateForm({ distance: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
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
          <label htmlFor="description">Description</label>
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
            value="Update post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
