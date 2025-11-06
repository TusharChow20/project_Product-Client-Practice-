import { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const { data } = useLoaderData();
  const [product, setProduct] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
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
      .then((fetchedData) => {
        console.log("Fetched bid data:", fetchedData);
        setProduct(Array.isArray(fetchedData) ? fetchedData : []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [user]);

  useEffect(() => {
    if (product.length > 0 && Array.isArray(data)) {
      const productIds = product.map((p) => String(p.product || p.productId));
      console.log("Product IDs from bids:", productIds);

      const filteredProducts = data.filter((item) =>
        productIds.includes(String(item.id))
      );

      // Detect missing products
      const missingProducts = productIds.filter(
        (id) => !data.some((item) => String(item.id) === String(id))
      );
      console.log("Products not found in loader:", missingProducts);

      console.log("Filtered products to show:", filteredProducts);
      setShowProduct(filteredProducts);
    }
  }, [product, data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Bidded Products ({showProduct.length})
      </h1>

      {showProduct.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showProduct.map((item) => {
            const { _id, id, image, title, price_min, price_max } = item;
            return (
              <div
                key={_id || id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img
                    src={image}
                    alt={title}
                    className="p-1 rounded-2xl w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={16}
                      className={
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                  {price_min !== price_max && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                      {Math.round(((price_max - price_min) / price_max) * 100)}%
                      OFF
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
                    {title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      {price_min === price_max ? (
                        <span className="text-lg font-bold text-gray-900">
                          {price_max} tk
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {price_min} tk - {price_max} tk
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/productDetails/${_id}`}
                      className="btn btn-primary flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-300 active:scale-95 transform shadow-md hover:shadow-lg"
                    >
                      <ShoppingCart size={14} />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">No products found</p>
      )}
    </div>
  );
};

export default MyProducts;
