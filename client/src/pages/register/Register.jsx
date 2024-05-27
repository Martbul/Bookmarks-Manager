import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { postRequest ,baseUrl} from "../../utils/services";
import { cn } from "../../utils/cn";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { BackgroundBeams } from "../../components/ui/background-beams";

import './Register.css';
const Register = ({ setUser }) => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerError,
    isRegisterLoading,
    registerUser,
  } = useContext(AuthContext);
  

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
      <div
        className="h-[100vh]  bg-neutral-950 relative flex flex-col items-center justify-center antialiased"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="max-w-2xl mx-auto p-4 side-by-side">
          {/* <div className="text">
            <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Join the waitlist
            </h1>
            <p></p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              Welcome to MailJet, the best transactional email service on the
              web. We provide reliable, scalable, and customizable email
              solutions for your business. Whether you&apos;re sending order
              confirmations, password reset emails, or promotional campaigns,
              MailJet has got you covered.
            </p>
          </div> */}

          <div className="form-register">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Aceternity
              </h2>
              <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Login to aceternity if you can because we don&apos;t have a
                login flow yet
              </p>
              <div className="register-form"></div>

              <form
                className="my-8"
                style={{ position: "relative", zIndex: 10 }}
                onSubmit={registerUser}
              >
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">Name</Label>
                    <Input
                      id="name"
                      placeholder="Tyler"
                      type="text"
                      onChange={(e) =>
                        updateRegisterInfo({
                          ...registerInfo,
                          name: e.target.value,
                        })
                      }
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="projectmay@gmail.com"
                    type="email"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        password: e.target.value,
                      })
                    }
                  />
                </LabelInputContainer>

                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                >
                  {isRegisterLoading ? "Creating Your Account" : "Register"}{" "}
                  &rarr;
                  <BottomGradient />
                </button>

                {registerError?.error && (
                  <Alert variant="danger">
                    <p>{registerError?.message}</p>
                  </Alert>
                )}

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                  <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      GitHub
                    </span>
                    <BottomGradient />
                  </button>

                  <GoogleLogin
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
      
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Google Login Failed");
                    }}
                  >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span>Google</span>

                    <BottomGradient />
                  </GoogleLogin>

                  <button
                    className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                  >
                    <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      OnlyFans
                    </span>
                    <BottomGradient />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>

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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Register;
