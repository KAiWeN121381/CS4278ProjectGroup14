import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <GoogleOAuthProvider clientId='968768895156-u0n5f8i1hh1hpg97kn0k49loulgrr4mk.apps.googleusercontent.com'>
            <GoogleLogin
            onSuccess={credentialResponse => {
                // Contains email, family_name, given_name, and other stuff that I dont think we need 
                var decodedResponse = jwtDecode(credentialResponse.credential);
                
                console.log(decodedResponse.email);
                navigate(-1); // Returns to the page it came from
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </GoogleOAuthProvider>
    )
}