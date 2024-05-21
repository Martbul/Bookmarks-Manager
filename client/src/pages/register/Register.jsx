import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { postRequest ,baseUrl} from "../../utils/services";

const Register = ({ setUser }) => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerError,
    isRegisterLoading,
    registerUser,
  } = useContext(AuthContext);
  const { authToYouTube, userYoutubeDetails } = useContext(ConnectionsContext);

  const handleGoogleLogin = async (credentialResponse) => {
    const token = JSON.stringify(credentialResponse);
    const decoded = jwtDecode(token);
    console.log(token);
    console.log(decoded);
    let userAuthObj = {
      email: decoded.email,
      name: decoded.given_name,
      token: credentialResponse.credential,
      
    };
    let registerInfo = {
      email: decoded.email,
      name: decoded.given_name,
      jti: decoded.jti,
    };

    try {
      const response = await postRequest(
        `${baseUrl}/users/googleRegisterLogin`,
        JSON.stringify(registerInfo)
      );
    } catch (error) {
      console.log("google se schupi", error);
    }
    console.log(userAuthObj);
    localStorage.setItem("User", JSON.stringify(userAuthObj));

    setUser(userAuthObj);
  };

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="emali"
                placeholder="Emali"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Creating Your Account" : "Register"}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
