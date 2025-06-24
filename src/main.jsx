import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="131898501532-f8nk5hfotdh3r8096h82bhocga7af1js.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
