import PostPreview from "../components/PostPreview";
import CustomLink from "../components/CustomLink";

import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";

// The global variables for login information can be put here or anywhere outside of functions

// This function also has {id} passed in like Edit and PostDisplay, which can be used for user id
export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
    records: [],
  });
  const [postlinkname, setPostlinkname] = useState("");
  const [post, setPost] = useState({
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
  let linkname = `/editprofile/${params.id.toString()}`;

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://anchorlease.space:5050/users/${params.id.toString()}`
      );

      console.log(id);
      console.log(response);
      if (!response.ok) {
        const message = `An error has occurred fetching user data: ${response.statusText}`;
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

  useEffect(() => {
    async function fetchData() {
      const id = form.post;
      const response = await fetch(
        `https://anchorlease.space:5050/posts/${form.post}`
      );

      if (!response.ok) {
        const message = `An error has occurred fetching post: ${response.statusText}`;
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
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Post with id ${id} not found`);
        navigate("/");
        return;
      }

      setPost(record);
      setPostlinkname(`/editpost/${form.post}`);
    }

    if (form.post !== "") {
      fetchData();
    }

    return;
  }, [form.post, navigate]);

  function userLogout() {
    googleLogout();
    sessionStorage.removeItem("userID");
    navigate("/");
  }
  async function deleteRecord() {
    await fetch(`http://127.0.0.1:5050/posts/${form.post}`, {
      method: "DELETE",
    });
    console.log(params.id.toString());
    console.log("deleteRecord");
    let userwithoutpost = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      post: "",
    };

    await fetch(`http://127.0.0.1:5050/users/${params.id.toString()}`, {
      method: "PATCH",
      body: JSON.stringify(userwithoutpost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="left_right_separator">
      <div>
        <h4>Name: {form.name}</h4>
        <h4>Email: {form.email}</h4>
        <h4>Phone Number: {form.phone}</h4>
        <CustomLink to={linkname}>
          <button className="edit-profile-button">Edit Profile</button>
        </CustomLink>
        <button className="edit-profile-button" onClick={userLogout}>
          Logout
        </button>
      </div>
      <div>
        <h2>Your Posts</h2>
        {form.post === "" && (
          <CustomLink to="/createpost">
            <button className="make-post-button">Make a Post</button>
          </CustomLink>
        )}
        {form.post !== "" && (
          <div>
            <PostPreview post={post} />
            <CustomLink to={postlinkname}>
              <button className="make-post-button">Edit Post</button>
            </CustomLink>
          </div>
        )}
      </div>
    </div>
  );
}
