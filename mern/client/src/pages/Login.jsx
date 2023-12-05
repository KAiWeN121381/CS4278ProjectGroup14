import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`https://anchorlease.space/users/`);

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

  let userID = sessionStorage.getItem("userID");

  if (userID) {
    navigate(`/profile/${userID}`);
  }

  return (
    <GoogleOAuthProvider clientId="968768895156-u0n5f8i1hh1hpg97kn0k49loulgrr4mk.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // Contains email, family_name, given_name, and other stuff that I dont think we need
          var decodedResponse = jwtDecode(credentialResponse.credential);
          let tempUsers = users.filter(
            (user) => user.email === decodedResponse.email
          );
          if (tempUsers.length !== 0) {
            sessionStorage.setItem("userID", String(tempUsers[0]._id));
            sessionStorage.setItem("userEmail", decodedResponse.email);
            userID = sessionStorage.getItem("userID");
            console.log(decodedResponse.email);
            navigate(-1);
          } else {
            sessionStorage.setItem("userEmail", decodedResponse.email);
            navigate(`/createprofile`);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}
