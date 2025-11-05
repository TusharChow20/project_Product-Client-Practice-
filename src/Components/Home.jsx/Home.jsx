import React from "react";
import LatestProduct from "../LatestProducts/LatestProduct";
const latestProductPromise = fetch(
  "https://deal-product-server.vercel.app/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div className="bg-primary">
      <LatestProduct
        latestProductPromise={latestProductPromise}
      ></LatestProduct>
    </div>
  );
};

export default Home;
