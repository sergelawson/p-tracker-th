import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Driver from "./pages/Driver";
import Tracker from "./pages/Tracker";
import Admin from "./pages/Admin";
import UserContext from "./components/UserContext";
import { useState } from "react";
import useAuth from "./hooks/useAuth";

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

  if (!user) {
    return (
      <UserContext.Provider value={{ user: user, setUser }}>
        <Login />
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
