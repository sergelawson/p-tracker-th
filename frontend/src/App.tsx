import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Driver from "./pages/Driver";
import Tracker from "./pages/Tracker";
import Admin from "./pages/Admin";
import UserContext from "./components/UserContext";
import { useContext, useState } from "react";
import useAuth from "./hooks/useAuth";
import { Box, Spinner } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/driver",
    element: <Driver />,
  },
  {
    path: "/tracker",
    element: <Tracker />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      <Auth />
    </UserContext.Provider>
  );
}

function Auth() {
  const { user } = useAuth({ isPrivate: true });

  if (!user) {
    return <Login />;
  }

  return <RouterProvider router={router} />;
}

export default App;
