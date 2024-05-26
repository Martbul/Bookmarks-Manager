import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { postRequest ,baseUrl} from "../../utils/services";
import { cn } from "../../utils/cn";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Label } from "../bookmarks/components/ui/label";
import { Input } from "../bookmarks/components/ui/input";


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



      <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-800 dark:via-pink-900 dark:to-red-800">
  <h2 className="font-bold text-2xl text-white dark:text-gray-200">
    Welcome to Aceternity
  </h2>
  <p className="text-gray-100 text-sm max-w-sm mt-2 dark:text-gray-300">
    Login to aceternity if you can because we don&apos;t have a login flow yet
  </p>

  <form className="my-8" onSubmit={registerUser}>
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
      <LabelInputContainer>
        <Label htmlFor="name" className="text-white dark:text-gray-300">First name</Label>
        <Input id="name" placeholder="Tyler" type="text" className="text-black dark:text-white"  onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }/>
      </LabelInputContainer>
     
    </div>
    <LabelInputContainer className="mb-4">
      <Label htmlFor="email" className="text-white dark:text-gray-300">Email Address</Label>
      <Input id="email" placeholder="projectmayhem@fc.com" type="email" className="text-black dark:text-white"  onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                } />
    </LabelInputContainer>
    <LabelInputContainer className="mb-4">
      <Label htmlFor="password" className="text-white dark:text-gray-300">Password</Label>
      <Input id="password" placeholder="••••••••" type="password" className="text-black dark:text-white" onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }/>
    </LabelInputContainer>
    

    <button
      className="bg-gradient-to-br relative group/btn from-purple-700 to-pink-700 block dark:from-purple-900 dark:to-pink-900 w-full text-white rounded-md h-10 font-medium shadow-md"
      type="submit"
    >
      Sign up &rarr;
      <BottomGradient />
    </button>

    <div className="bg-gradient-to-r from-transparent via-white dark:via-gray-700 to-transparent my-8 h-[1px] w-full" />

    <div className="flex flex-col space-y-4">
      <button
        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium shadow-md bg-gray-700 dark:bg-gray-800"
        type="button"
      >
        <IconBrandGithub className="h-4 w-4 text-white" />
        <span className="text-white text-sm">
          GitHub
        </span>
        <BottomGradient />
      </button>



      <button
        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium shadow-md bg-gray-700 dark:bg-gray-800"
        type="button"
      >
        <IconBrandGoogle className="h-4 w-4 text-white" />
        <span className="text-white text-sm">
          Google
        </span>
        <BottomGradient />
      </button>
        
    </div>
  </form>
</div>

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
