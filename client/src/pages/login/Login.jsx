import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { postRequest, baseUrl } from "../../utils/services";

const Login = ({setUser}) => {
  const { loginInfo, loginError, loginUser, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);
  
   const handleGoogleLogin = async (credentialResponse) => {
     const token = JSON.stringify(credentialResponse);
     const decoded = jwtDecode(token);
     console.log(token);
     console.log(decoded);
     let userAuthObj = {
       email: decoded.email,
       name: decoded.given_name,
       token: credentialResponse.credential,
       jti: decoded.jti,
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
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control
                type="emali"
                placeholder="Emali"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Getting you in..." : "Login"}
              </Button>

              {loginError?.error && (
                <>
                  <Alert variant="danger">
                    <p>{loginError?.message}</p>
                  </Alert>
                </>
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

export default Login;
