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
    pet: false,
    gym: false,
    kitchen: false,

    description: "",
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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
  /*
  async function setPoster(){
    
    useEffect(() => {
      async function getRecords() {
        const response = await fetch(`http://127.0.0.1:5050/posts/`);
  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const records = await response.json();
        setRecords(records);
      }
  
      getRecords();
  
      return;
    }, [records.length]);

    let tempRecords = records.filter((record) => record.title === form.title);
    if(tempRecords.length !== -1){
      const response = await fetch(
        `http://127.0.0.1:5050/users/${global.USERID}`
      );
      const userWithPost = {
        name: response.name,
        email: response.email,
        phone: response.phone,
        post: tempRecords[0].id,
      };

      // This will send a post request to update the data in the database.
    await fetch(`http://127.0.0.1:5050/users/${global.USERID}`, {
      method: "PATCH",
      body: JSON.stringify(userWithPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    }
  }*/
  async function getUser() {
    const response = await fetch(
      `http://127.0.0.1:5050/users/${ID}`
    );

    const user = {
      name: response.name,
      email: response.email,
      phone: response.phone,
    };
    setUser(user);
  }

  async function getRecords() {
    const response = await fetch(`http://127.0.0.1:5050/posts/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPost = { ...form };

    await fetch("http://127.0.0.1:5050/posts", {
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
    getUser();

    let tempRecords = records.filter((record) => record.title === form.title);

    let userwithpost = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      post: String(tempRecords[0]._id),
    };

    
    if (tempRecords.length !== -1) {
      // This will send a post request to update the data in the database.
      await fetch(`http://127.0.0.1:5050/users/${ID}`, {
        method: "PATCH",
        body: JSON.stringify(userwithpost),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

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
  // Make everything required
  return (
    <div style={{marginLeft:"2vw"}}>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Name </label>
          <input
            data-testid="Name-input"
            type="text"
            className="form-control"
            id="username"
            defaultValue={user.name}
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
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
            data-testid="gym-input"
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
