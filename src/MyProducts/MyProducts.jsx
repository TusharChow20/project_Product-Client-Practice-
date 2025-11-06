import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [product, setPRoduct] = useState([]);
  console.log(product);
  
  useEffect(() => {
    fetch(
      `https://deal-product-server.vercel.app/BidData?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array
        setPRoduct(Array.isArray(data) ? data : []);
      });
  }, [user]);
  return (
    <div>
      <h1>{product.length}</h1>
    </div>
  );
};

export default MyProducts;
