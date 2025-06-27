import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import Message from '../components/Message';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.pathname === '/signup' ? 'signup' : 'login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMode(location.pathname === '/signup' ? 'signup' : 'login');
  }, [location.pathname]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleManualAuth = async () => {
    setLoading(true);
    setMessage(null);
    const isLogin = mode === 'login';
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const res = await axios.post(`http://localhost:5000/api${endpoint}`, { email, password });
      if (isLogin) {
        setMessage({ text: 'Login Success!', type: 'success' });
        if (res.data.token) localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setMessage({ text: 'Signup Success! You can now log in.', type: 'success' });
        if (res.data.token) localStorage.setItem('token', res.data.token);
        navigate('/login');
      }
    } catch (err) {
      if (!isLogin && err.response?.status === 400) {
        setMessage({ text: 'User already exists. Please log in.', type: 'error' });
      } else {
        setMessage({
          text: err.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`,
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('✅ Decoded Google User:', decoded);
    setLoading(true);
    setMessage(null);
    fetch('http://localhost:5000/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential, mode }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: `Server error: ${res.status}` }));
          throw new Error(errorData.message);
        }
        return res.json();
      })
      .then((data) => {
        console.log('✅ Server Response:', data);
        setMessage({ text: data.message || 'Google login successful!', type: 'success' });
        if (data.token) localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        setMessage({ text: err.message, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white p-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-lg lg:text-xl text-center">
          Book your flights seamlessly and manage your trips with ease.
        </p>
      </div>
      <div className="w-full lg:w-2/5 min-h-screen flex justify-center items-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <Message text={message?.text} type={message?.type} />
            <AuthForm
              type={mode}
              onSubmit={handleManualAuth}
              loading={loading}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <div className="flex flex-col items-center">
              <div className={loading ? 'pointer-events-none opacity-50' : ''}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert('Google Login Failed')}
                  useOneTap={false}
                  width="364px"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            {mode === 'login' ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
