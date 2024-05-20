import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from './contexts/AuthContext.jsx';

import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId="514607532464-8e0usq72mockirp1307hgmfv3tjt690k.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
     </AuthContextProvider>
    </BrowserRouter>
     
    
    
  </React.StrictMode>,
)
