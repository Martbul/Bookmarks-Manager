import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest,baseUrl} from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));	
  
  
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
      name: "",
      email: "",
      password: "",
    });
  
  
  //console.log(user);
  
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
      email: "",
      password: "",
    });
  
 
  
  
    useEffect(() => {
     
      const user = localStorage.getItem("User");
    
      setUser(JSON.parse(user));
    }, [localStorage.getItem("User")]);
    
  
    const updateRegisterInfo = useCallback((info) => {
      setRegisterInfo(info);
    }, []);
  
    const updateLoginInfo = useCallback((info) => {
      setLoginInfo(info);
    }, []);
  
  
  
    const registerUser = useCallback(async (e) => {
      e.preventDefault();
  
      setIsRegisterLoading(true);
      setRegisterError(null);
  
      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );
  
      setIsRegisterLoading(false);
  
      if (response.error) {
        return setRegisterError(response);
      }
  
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      navigate('/bookmarks/connections')
    }, [registerInfo]);
  
  
  
  
    const loginUser = useCallback(async(e)=>{
      e.preventDefault();
  
      setIsLoginLoading(true);
      setLoginError(null)
  
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );
  
      setIsLoginLoading(false);
  
      if(response.error){
          return setLoginError(response);
      }
      
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
  navigate("/bookmarks/connections");
    },[loginInfo]) 
  
  
  
    const logoutUser = useCallback(async()=>{
      localStorage.removeItem("User");
      setUser(null);
    },[])
  
  
  
    return (
      <AuthContext.Provider
        value={{
          setUser,
          user,
          registerInfo,
          loginInfo,
          registerError,
          loginError,
          isRegisterLoading,
          isLoginLoading,
          updateRegisterInfo,
          updateLoginInfo,
          registerUser,
          loginUser,
          logoutUser,
        }}
      >
        {children}
      </AuthContext.Provider>
      //* when you use the authContext you can
      //* extract the value of the props give here - user
    );
  };
  