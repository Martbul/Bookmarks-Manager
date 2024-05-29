import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";



//dont remove these 2 imports(i dont know how or way but when i remove them the app breaks)
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";



import Connections from "./pages/bookmarks/views/connections/Connections";
import Home from "./pages/home/Home";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import {  ConnectionsContextProvider } from "./contexts/ConnectionsContext";
import Bookmarks from "./pages/bookmarks/Bookmarks";




function App() {
  const { user, setUser } = useContext(AuthContext);
  
  return (
    <ConnectionsContextProvider user={user}>
      {/* <Container> */}
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route
          path="/connections"
          element={user ? <Connections /> : <Register setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Home /> : <Register setUser={setUser} />}
        />
        <Route
          path="/login"
          element={user ? <Home /> : <Login setUser={setUser} />}
        />
        <Route path="/bookmarks/*" element={<Bookmarks />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* </Container> */}
    </ConnectionsContextProvider>
  );
}

export default App;


