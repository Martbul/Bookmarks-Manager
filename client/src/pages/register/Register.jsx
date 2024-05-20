import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo,registerError,isRegisterLoading,registerUser } = useContext(AuthContext);
  const { authToYouTube, userYoutubeDetails} = useContext(ConnectionsContext);
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
                {isRegisterLoading ? "Creating Your Account": "Register"}
              </Button>
                    {
                        registerError?.error &&  <Alert variant="danger">
                        <p>{registerError?.message}</p>
                      </Alert>
                    }
             
            </Stack>
          </Col>
        </Row>
      </Form>
      <button
          className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          onClick={()=> authToYouTube()}
        >
          Google SignUp
        </button>
    </>
  );
};

export default Register;
