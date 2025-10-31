import { createBrowserRouter } from "react-router";
import Home from "../Components/Home.jsx/Home";
import RootLayout from "../Components/Layout/RootLayout";
import AllPRoducts from "../Components/AllProducts/AllPRoducts";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/REgister";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllPRoducts,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
