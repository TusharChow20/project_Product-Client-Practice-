import { use } from "react";
import Product from "./Product";

const LatestProduct = ({ latestProductPromise }) => {
  const latestProduct = use(latestProductPromise);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold px-10  text-primary">
              Recent Products
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base ml-15">
            Discover our latest arrivals
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 sm:gap-4 lg:gap-5">
          {latestProduct.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LatestProduct;
