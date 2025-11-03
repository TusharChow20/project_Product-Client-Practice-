import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const product = useLoaderData();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    buyerImage: "",
    offerPrice: "",
    contactInfo: "",
  });
  // console.log(product.id);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${product.id}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [product.id]);
  const handleBids = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const price = e.target.price.value;
    // console.log(product.id, price, email);
    const newBid = {
      product: product.id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: parseFloat(price),
      status: "Pending",
    };

    fetch("http://localhost:3000/BidData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Bid submitted successfully!");
          setIsModalOpen(false);
          setFormData({
            buyerImage: "",
            offerPrice: "",
            contactInfo: "",
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        } else {
          alert("Failed to submit bid. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting bid:", error);
        alert("An error occurred while submitting your bid.");
      });
  };

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
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBuyClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Bid submitted:", formData);
  //   setIsModalOpen(false);
  //   setFormData({
  //     buyerImage: "",
  //     offerPrice: "",
  //     contactInfo: "",
  //   });
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      buyerImage: "",
      offerPrice: "",
      contactInfo: "",
    });
  };

  return (
    <div>
      <div>
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              to={"/"}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 font-medium text-sm sm:text-base"
            >
              <ArrowLeft size={20} />
              Back To Products
            </Link>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs sm:text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">
                    Price starts from
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">
                    {product?.price_min} tk. - {product?.price_max} tk.
                  </p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                    Product Details
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Product ID:</span>
                      <span className="font-medium text-gray-900 truncate ml-2">
                        {product.id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Posted:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(product.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                    Seller Information
                  </h2>

                  <div className="flex items-center gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                    <img
                      src={product.seller_image}
                      alt={product.seller_name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {product.seller_name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        ({product?.id?.substring(0, 8)}...)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                      <MapPin
                        size={16}
                        className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                      />
                      <span className="break-words">{product.location}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                      <Mail
                        size={16}
                        className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                      />
                      <span className="text-xs sm:text-sm break-all">
                        {product.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                      <Phone
                        size={16}
                        className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                      />
                      <span>{product.seller_contact}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Tag
                        size={16}
                        className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                      />
                      <span
                        className={`${getStatusColor()} text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleBuyClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  I Want Buy This Product
                </button>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Product Description
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Package
                      size={16}
                      className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                    />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Condition:
                      </p>
                      <p className="font-semibold text-gray-900 capitalize text-sm sm:text-base">
                        {product.condition}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar
                      size={16}
                      className="text-gray-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                    />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Usage Time:
                      </p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {product.usage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <form
            onSubmit={handleBids}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-auto">
              <div className="border-b border-gray-200 p-4 sm:p-6 sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 pr-2">
                    Give Seller Your Offered Price
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={user?.displayName || user?.name || ""}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md bg-gray-50 text-gray-600 "
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Buyer Image URL
                    </label>
                    <input
                      type="url"
                      name="buyerImage"
                      value={formData.buyerImage}
                      onChange={handleInputChange}
                      placeholder="https://...your_img_url"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Place your Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter your offer"
                      required
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Contact Info
                    </label>
                    <input
                      type="tel"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="e.g. +880-***-1234"
                      required
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      // onClick={handleSubmit}
                      className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium transition-colors"
                    >
                      Submit Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      {/* //bid section  */}

      <div className="px-15">
        <h1 className="text-2xl font-bold">
          Bids For This Product: {bids.length}{" "}
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {bid.buyer_email}
                    </span>
                  </td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
