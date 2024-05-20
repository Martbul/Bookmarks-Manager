import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
import { AuthContext } from "./AuthContext";

export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [userGoogleAccessToken, setGoogleAccessToken] = useState(null);

  useEffect(() => {
    const id = user?._id
    console.log(user);
    const getUser = async () => {
      const response = await postRequest(`${baseUrl}/users/singleUser`,JSON.stringify({
        id,
      }));
     

      if (response.error) {
        return console.log("Error fetching user", response);
      }
      console.log("response", response);

      setGoogleAccessToken(response);
    };

    getUser();
  }, []);

  const authToYouTube = useCallback(async () => {
    window.location.href = "http://localhost:5000/api/users/google";
  });

  return (
    <ConnectionsContext.Provider
      value={{ authToYouTube, userGoogleAccessToken }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
