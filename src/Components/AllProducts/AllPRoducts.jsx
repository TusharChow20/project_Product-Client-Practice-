import React from "react";
import { useLoaderData } from "react-router";
import Product from "../LatestProducts/Product";

const AllPRoducts = () => {
  const { data } = useLoaderData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 sm:gap-4 lg:gap-5">
      {data.map((eachData) => (
        <Product key={eachData._id} product={eachData}></Product>
      ))}
    </div>
  );
};

export default AllPRoducts;
