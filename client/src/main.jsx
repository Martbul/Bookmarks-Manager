import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthContextProvider>
      <GoogleOAuthProvider clientId="1048094555829-ups5m1n2nurrvenev0etnshjd1bgcsmu.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
     </AuthContextProvider>
    
    
  </React.StrictMode>,
)
