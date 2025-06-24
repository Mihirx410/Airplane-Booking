import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('✅ Decoded Google User:', decoded);

    // ✅ Send Google token to your backend for verification/login
    fetch('http://localhost:5000/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log('✅ Server Response:', data))
      .catch((err) => console.error('❌ Error:', err));
  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log('❌ Google Login Failed')}
      />
    </div>
  );
}

export default Login;
