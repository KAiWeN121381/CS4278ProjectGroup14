import Lhouse from '../assets/defaulthouse.png'
import MapComponent from "../components/MapComponent";
import info from '../assets/info.png'

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/posts/${params.id.toString()}`);

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


    return (
        <div>
            <div className="left_right_separator">
                <div className="post-left">
                    <div className="post-image">
                        <h1>{form.title}</h1>
                        <img
                            src={form.file===null ? Lhouse : form.file}>
                        </img>
                    </div>      
                </div>
                <div className="post-right">
                    <div style={{display:'flex'}}>
                        <h1>Property details</h1>
                        <img src={info} style={{width:'2.5vh', height:'2.5vh', marginTop:'3vh', marginLeft:'0.5vw'}}/>
                    </div>
                    <div className="post-details">
                        <div className="post-details-text">
                            <div className="post-detail-inline">
                                <h5>Price: </h5> 
                                <h5> {form.price} / Month</h5>
                            </div>
                            <div className="post-detail-inline">
                                <h5>Duration: </h5> 
                                <h5> {form.start} - {form.end}</h5>
                            </div>
                            <div className="post-detail-inline">
                                <h5>Distance to campus: </h5>
                                <h5> {form.distance} Mi</h5>
                            </div>
                            <div>
                                <h5>Facilities: </h5>
                            </div>
                            <h5>Location: </h5>
                            <MapComponent/>
                        </div>
                        <div className='post-details-wrapper'>
                            <button className='request-sublet-button'>Request Sublet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}