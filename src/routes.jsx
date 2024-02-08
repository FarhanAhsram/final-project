import ProtectedRoute from "./hoc/ProtectedRoute";
import Login from "./pages/Authentication/Login/login";
import Register from "./pages/Authentication/Register/register";
import Home from "./pages/Home/home";

import ListUsers from "./pages/User/ListUsers/listusers";
import UserAccount from "./pages/User/UserAccount/useraccount";

import ListFoods from "./pages/Food/ListFoods/listfoods";
import CreateFood from "./pages/Food/CreateFood/createfood";
import EditFood from "./pages/Food/EditFood/editfood";
import DetailFood from "./pages/Food/DetailFood/detailfood";
import LikedFood from "./pages/Food/LikedFood/likedfood";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listusers",
    element: (
      <ProtectedRoute>
        <ListUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/useraccount",
    element: (
      <ProtectedRoute>
        <UserAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listfoods",
    element: (
      <ProtectedRoute>
        <ListFoods />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createfood",
    element: (
      <ProtectedRoute>
        <CreateFood />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editfood/:id",
    element: (
      <ProtectedRoute>
        <EditFood />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detailfood/:id",
    element: (
      <ProtectedRoute>
        <DetailFood />
      </ProtectedRoute>
    ),
  },
  {
    path: "/likedfood",
    element: (
      <ProtectedRoute>
        <LikedFood />
      </ProtectedRoute>
    ),
  },
];
