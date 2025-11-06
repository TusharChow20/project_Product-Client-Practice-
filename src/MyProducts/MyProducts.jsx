import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useLoaderData, Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const { data } = useLoaderData();
  const [product, setProduct] = useState([]);
  const [showproduct, setShowProduct] = useState([]);

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
        setProduct(Array.isArray(data) ? data : []);
      });
  }, [user]);

  // Filter and match products
  useEffect(() => {
    if (product.length > 0 && data.length > 0) {
      // Extract product IDs from user's products
      const productIds = product.map((p) => console.log(p._id));

      const filteredProducts = data.filter((item) =>
        productIds.includes(item._id)
      );

      setShowProduct(filteredProducts);
    }
  }, [product, data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        My Products ({showproduct.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {showproduct.map((item) => (
          <ProductCard key={item._id} {...item} />
        ))}
      </div>

      {showproduct.length === 0 && (
        <p className="text-center text-gray-500 py-12">No products found</p>
      )}
    </div>
  );
};
export default MyProducts;
