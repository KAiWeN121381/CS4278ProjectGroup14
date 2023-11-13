import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='968768895156-u0n5f8i1hh1hpg97kn0k49loulgrr4mk.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
