import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Register from "./pages/Form/Register";
import Login from "./pages/Form/Login";
import Profile from "./pages/Profile/Profile";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import Logout from "./components/Logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserConnected>
            <Profile/>
          </UserConnected>
        ),
      },
      {
        path: "/logout",
        element: (
          <UserConnected>
            <Logout />
          </UserConnected>
        ),
      },
    ],
  },
]);
