import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

var userID = "";
global.USERID = userID;

export default function LoginPage() {
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();

    //let linkname = `/createprofile`;
    useEffect(() => {
            async function getUsers() {
                const response = await fetch(`http://127.0.0.1:5050/users/`);
        
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

    return (
        <GoogleOAuthProvider clientId='968768895156-u0n5f8i1hh1hpg97kn0k49loulgrr4mk.apps.googleusercontent.com'>
            <GoogleLogin
            onSuccess={credentialResponse => {
                // Contains email, family_name, given_name, and other stuff that I dont think we need 
                var decodedResponse = jwtDecode(credentialResponse.credential);
                let tempUsers = users.filter((user) => user.email === decodedResponse.email)
                if (tempUsers.length !== 0){
                    global.USERID = String(tempUsers[0]._id);
                    console.log(decodedResponse.email);
                    console.log(global.USERID, "asdfasdfasdfad");
                    navigate(`/`); // Returns to main page
                }
                else{
                    navigate(`/newprofile`)
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </GoogleOAuthProvider>
    )
}