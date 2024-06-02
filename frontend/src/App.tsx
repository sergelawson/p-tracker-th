import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Driver from "./pages/Driver";
import Tracker from "./pages/Tracker";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
  const authStatus: boolean = true;

  if (!authStatus) {
    return <Login />;
  }

  return <RouterProvider router={router} />;
}

export default App;
