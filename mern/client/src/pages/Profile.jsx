import PostPreview from "../components/PostPreview";
import CustomLink from "../components/CustomLink";

import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

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
  const [postlinkname, setPostlinkname] = useState("")
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
      console.log("User first");
      const id = params.id.toString();
      console.log(params.id)
      const response = await fetch(
        `http://127.0.0.1:5050/users/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        console.log("error 1");
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
      console.log("post first");
      const id = form.post;
      const response = await fetch(`http://127.0.0.1:5050/posts/${form.post}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.log("error 2");
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
      setPostlinkname(`/editpost/${id}`)
    }

    if (form.post !== "") {
      fetchData();
    }

    return;
  }, [form.post, navigate]);

  return (
    <div className="left_right_separator">
      <div>
        <h4>Name: {form.name}</h4>
        <h4>Email: {form.email}</h4>
        <h4>Phone Number: {form.phone}</h4>
        <CustomLink to={linkname}>
          <button className="edit-profile-button">Edit Profile</button>
        </CustomLink>
      </div>
      <div>
        <h2>Your Posts</h2>
        {form.post === "" && (
          <CustomLink to="/createpost">
            <button className="make-post-button">Make a Post</button>
          </CustomLink>
        )}
        {form.post !== "" && 
        <div>
          <PostPreview post={post} />
          <CustomLink to={postlinkname}><button className="make-post-button">Edit Post</button></CustomLink>
        </div>
        }

      </div>
    </div>
  );
}
