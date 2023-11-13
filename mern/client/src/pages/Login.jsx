import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage() {
    return (
        <GoogleOAuthProvider clientId='968768895156-u0n5f8i1hh1hpg97kn0k49loulgrr4mk.apps.googleusercontent.com'>
            <GoogleLogin
            onSuccess={credentialResponse => {
                // Contains email, family_name, given_name, and other stuff that I dont think we need 
                var decodedResponse = jwtDecode(credentialResponse.credential);
                console.log(decodedResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
        </GoogleOAuthProvider>
    )
}