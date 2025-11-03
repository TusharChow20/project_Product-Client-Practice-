import { createBrowserRouter } from "react-router";
import Home from "../Components/Home.jsx/Home";
import RootLayout from "../Components/Layout/RootLayout";
import AllPRoducts from "../Components/AllProducts/AllPRoducts";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/REgister";
import ProductDetails from "../Components/LatestProducts/ProductDetails";
import MyBids from "../Components/LatestProducts/MyBids";
import PrivateRoutes from "./PrivateRoutes";

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
      {
        path: "productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoutes>
            <MyBids />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
