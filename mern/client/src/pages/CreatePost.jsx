import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();
  let ID = sessionStorage.getItem("userID");

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
    pet_friendly: false,
    gym: false,
    kitchen: false,

    description: "",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
  });
  const [records, setRecords] = useState([]);
  if (ID === "") {
    navigate("/createprofile");
  }

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function getUser() {
    const response = await fetch(
      `https://anchorlease.space/users/${ID.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = await response.json();
    if (!user) {
      window.alert(`User with id ${ID} not found`);
      navigate("/");
      return;
    }
    // console.log("1st");
    // console.log(ID);
    // console.log(response);
    console.log(response.json);
    console.log(user);

    setUser(user);
    console.log("llassb", user);
  }

  async function getRecords() {
    const response = await fetch(`https://anchorlease.space/posts/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const temp = await response.json();
    setRecords(temp);

    let tempRecords = temp.filter((records) => records.title === form.title);

    const userResponse = await fetch(
      `https://anchorlease.space/users/${ID.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const tempUser = await userResponse.json();
    if (!tempUser) {
      window.alert(`User with id ${ID} not found`);
      navigate("/");
      return;
    }
    console.log(response.json);
    console.log(tempUser);

    setUser(tempUser);

    console.log(user);
    let userwithpost = {
      name: tempUser.name,
      email: tempUser.email,
      phone: tempUser.phone,
      post: String(tempRecords[0]._id),
    };
    console.log("with post", userwithpost);

    if (tempRecords.length !== -1) {
      // This will send a post request to update the data in the database.
      await fetch(`https://anchorlease.space/users/${ID}`, {
        method: "PATCH",
        body: JSON.stringify(userwithpost),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPost = { ...form };

    await fetch("https://anchorlease.space/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    getRecords();

    setForm({
      username: "",
      title: "",
      file: null,
      price: "",
      start: "",
      end: "",
      distance: "",
      address: "",
      pet_friendly: false,
      gym: false,
      kitchen: false,
      description: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  // Make everything required
  return (
    <div style={{ marginLeft: "2vw" }}>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            data-testid="Name-input"
            type="hidden"
            className="form-control"
            id="username"
            defaultValue={user.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title </label>
          <input
            data-testid="Title-input"
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
            type="number"
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
            data-testid="dist-input"
            type="number"
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
          <label htmlFor="pet_friendly">Pet</label>
          <input
            type="checkbox"
            className="form-control"
            id="pet_friendly"
            checked={form.pet_friendly}
            onChange={(e) => updateForm({ pet_friendly: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gym">Gym</label>
          <input
            data-testid="gym-input"
            type="checkbox"
            className="form-control"
            id="gym"
            checked={form.gym}
            onChange={(e) => updateForm({ gym: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="kitchen">Kitchen</label>
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
            data-testid="submit"
            type="submit"
            value="Create post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
