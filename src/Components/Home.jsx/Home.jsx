import React from "react";
import LatestProduct from "../LatestProducts/LatestProduct";
const latestProductPromise = fetch(
  "http://localhost:3000/latest-products"
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
