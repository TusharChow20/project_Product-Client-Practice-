import { createBrowserRouter } from "react-router";
import Home from "../Components/Home.jsx/Home";
import RootLayout from "../Components/Layout/RootLayout";
import AllPRoducts from "../Components/AllProducts/AllPRoducts";

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
    ],
  },
]);

export default router;
