import Lhouse from "../assets/defaulthouse.png";
import MapComponent from "../components/MapComponent";
import Request from "../components/Request";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { MdPets, MdKitchen } from "react-icons/md";
import { CgGym } from "react-icons/cg";

export default function PostDisplay() {
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

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
    records: [],
  });

  const [posters, setPosters] = useState([]);
  const [toEmail, setToEmail] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/posts/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error at PostDisplay has occurred: ${response.statusText}`;
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

  useEffect(() => {
    async function getUsers() {
        const response = await fetch(`http://localhost:5050/users/`);

        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }

        const users = await response.json();
        setPosters(users);
    }

    getUsers();

    
    let tempPoster = posters.filter((poster) => poster.post === params.id);
    if (tempPoster.length > 0) {  
      let to_email = tempPoster[0].email.toString(); 
      console.log(tempPoster);
      setToEmail(to_email);
      console.log(toEmail);
    }
    
    return;
  }, [posters.length]);
  

  useEffect(() => {
    async function fetchData() {
      const id = sessionStorage.getItem("userID") ? sessionStorage.getItem("userID").toString() : "";
      const response = await fetch(
        `http://localhost:5050/users/${id.toString()}`
      );

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

      setUser(user);
    }

    fetchData();

    return;
  }, [sessionStorage.getItem("userID"), navigate]);

  return (
    <div>
      <div className="left_right_separator">
        <div className="post-left">
          <div className="post-image">
            <h1>{form.title}</h1>
            <img src={form.file === null ? Lhouse : form.file}></img>
          </div>
        </div>
        <div className="post-right">
          <div style={{ display: "flex" }}>
            <h1>Property details</h1>
          </div>
          <div className="post-details">
            <div className="post-details-text">
              <div className="post-detail-inline">
                <h5>Price: </h5>
                <h5> {form.price} / Month</h5>
              </div>
              <div className="post-detail-inline">
                <h5>Duration: </h5>
                <h5>
                  {" "}
                  {form.start} - {form.end}
                </h5>
              </div>
              <div className="post-detail-inline">
                <h5>Distance to campus: </h5>
                <h5> {form.distance} Mi</h5>
              </div>
              <div>
                <h5>Facilities: </h5>
                <div className="filter-content-block">
                    {form.pet && <MdPets className="facility-button-img" title="Pets allowed"/>}
                    {form.gym && <CgGym className="facility-button-img" title="Gym"/>}
                    {form.kitchen && <MdKitchen className="facility-button-img" title="Kitchen"/>}
                  </div>
              </div>
              <div style={{ height: "10vh" }}>
                <h5>Location: </h5>
                <MapComponent address={form.address}/>
              </div>
            </div>
            <div className="post-details-wrapper">
              <Request to_name={form.username} from_name={user.name} reply_to={user.email} to_email={toEmail}/>
              {/* <button className="request-sublet-button">Request Sublet</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
