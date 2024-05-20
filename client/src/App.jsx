import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

import Connections from "./pages/connections/Connections";
import Home from "./pages/home/Home";
import NavBar from "./componens/NavBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import {  ConnectionsContextProvider } from "./contexts/ConnectionsContext";
//import { BookmarksContextProvider } from "./contexts/BookmarksContext";
function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <ConnectionsContextProvider user={user}>
     
          <NavBar></NavBar>
      <Container>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/connections" element={user ? <Connections /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
     
    
    </ConnectionsContextProvider>
  );
}

export default App;