import React, { use } from "react";
import { useLoaderData } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  Tag,
} from "lucide-react";

const ProductDetails = () => {
  const getStatusColor = () => {
    switch (product.status) {
      case "pending":
        return "bg-yellow-400";
      case "sold":
        return "bg-red-500";
      case "available":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BST", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const product = useLoaderData();
  console.log(product);

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium">
            <ArrowLeft size={20} />
            Back To Products
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">
                  {product.category}
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Price starts from</p>
                <p className="text-3xl font-bold text-green-600">
                  ${product.price_min.toLocaleString()} -{" "}
                  {product.price_max.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Product Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product ID:</span>
                    <span className="font-medium text-gray-900">
                      {product.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(product.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Seller Information
                </h2>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <img
                    src={product.seller_image}
                    alt={product.seller_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.seller_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({product.id.substring(0, 8)}...)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-gray-500" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail size={18} className="text-gray-500" />
                    <span className="text-sm">{product.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone size={18} className="text-gray-500" />
                    <span>{product.seller_contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-gray-500" />
                    <span
                      className={`${getStatusColor()} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200">
                I Want Buy This Product
              </button>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Product Description
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Condition:</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {product.condition}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Usage Time:</p>
                    <p className="font-semibold text-gray-900">
                      {product.usage}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-gray-700 leading-relaxed">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
