import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
           <Container>
              
          <h2>
            <Link to="/" className="link-light text-decoration-none">
            Home
            </Link>
          </h2>
          <h2>
            <Link to="/bookmarks" className="link-light text-decoration-none">
              Bookmarks Manager
            </Link>
          </h2>
          <h4>
            {" "}
            <Link to="/connections" className="link-light text-decoration-none">
              Connections
            </Link>
          </h4>
          {user && (
            <>
              <span className="text-warning">Logged in as {user?.name}</span>
            </>
          )}

          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user && (
                <>
                  <Link
                    onClick={() => logoutUser()}
                    to="/login"
                    className="link-light text-decoration-none"
                  >
                    {" "}
                    Logout
                  </Link>
                </>
              )}

              {!user && (
                <>
                  <Link to="/login" className="link-light text-decoration-none">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="link-light text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
<></>;
