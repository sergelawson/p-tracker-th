import axios from "axios";
import { useState, useContext, useLayoutEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import UserContext from "../components/UserContext";

const useAuth = ({ isPrivate }: { isPrivate?: boolean }) => {
  const URL = "http://localhost:2002";

  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [localUser, setLocalUser] = useLocalStorage("user");

  useLayoutEffect(() => {
    if (!localUser?.accesToken && isPrivate) {
      setLocalUser(null);
      setUser(null);
    }

    if (localUser?.accesToken && isPrivate) {
      setIsLoggedIn(true);
      setUser(localUser);
    }
  }, []);

  // Sign in the user
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${URL}/api/sessions`, {
        email,
        password,
      });

      const { accesToken, refreshToken, name, role } = data;

      setLocalUser({ role, name, email, accesToken, refreshToken });

      setUser({ role, name, email, accesToken, refreshToken });
    } catch (erorObj: any) {
      console.error(erorObj);
      if (erorObj && erorObj?.response && erorObj?.response?.data) {
        const message = erorObj?.response?.data;

        setError(message);

        setTimeout(() => {
          setError(null);
        }, 6000);
      }
    } finally {
      setLoading(false);
    }
  };

  const signout = () => {
    setLocalUser(null);
    setUser(null);
    setIsLoggedIn(false);
    axios.delete(`${URL}/api/sessions`);
  };

  return {
    signin,
    signout,
    error,
    loading,
    isLoggedIn,
    localUser,
    user,
  };
};

export default useAuth;
