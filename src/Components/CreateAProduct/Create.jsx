import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

import useAuth from "../../CustomHook/useAuth";
import useAxiosSecure from "../../CustomHook/useAxiosSecure";

export default function CreateProductForm() {
  const axiosInstence = useAxiosSecure();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    condition: "Brand New",
    usageTime: "",
    productImageUrl: "",
    sellerName: "",
    sellerEmail: "",
    sellerContact: "",
    sellerImageUrl: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    const condition = e.target.condition.value;
    const usageTime = e.target.usageTime.value;
    const productImageUrl = e.target.productImageUrl.value;
    const sellerName = e.target.sellerName.value;
    const sellerEmail = e.target.sellerEmail.value;
    const location = e.target.location.value;
    console.log(
      title,
      minPrice,
      maxPrice,
      condition,
      usageTime,
      productImageUrl,
      sellerEmail,
      sellerName,
      location
    );
    const newProduct = {
      title,
      minPrice,
      maxPrice,
      condition,
      usageTime,
      productImageUrl,
      sellerEmail,
      sellerName,
      location,
    };
    axiosInstence
      .post("/products", newProduct)
      .then((data) => console.log(data.data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={20} />
          <span>Back To Products</span>
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">
          Create <span className="text-purple-600">A Product</span>
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white  rounded-lg p-8 space-y-6"
        >
          {/* Row 1: Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Yamaha F2 Guitar for Sale"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select a Category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="vehicles">Vehicles</option>
                <option value="instruments">Musical Instruments</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 2: Min Price and Max Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price You want to Sale ($)
              </label>
              <input
                type="number"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                placeholder="e.g. 18.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price You want to Sale ($)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                placeholder="Optional (default = Min Price)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 3: Product Condition and Usage Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Condition
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    value="Brand New"
                    checked={formData.condition === "Brand New"}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Brand New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    value="Used"
                    checked={formData.condition === "Used"}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Used</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Usage Time
              </label>
              <input
                type="text"
                name="usageTime"
                value={formData.usageTime}
                onChange={handleChange}
                placeholder="e.g. 1 year 3 month"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 4: Product Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Product Image URL
            </label>
            <input
              type="url"
              name="productImageUrl"
              value={formData.productImageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Row 5: Seller Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Name
              </label>
              <input
                type="text"
                name="sellerName"
                value={user?.name}
                onChange={handleChange}
                placeholder="e.g. Artisan Roasters"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                // value={}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Email
              </label>
              <input
                type="email"
                name="sellerEmail"
                value={user.email}
                onChange={handleChange}
                placeholder="lei31955@nirlord.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          {/* Row 6: Seller Contact and Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Contact
              </label>
              <input
                type="tel"
                name="sellerContact"
                value={formData.sellerContact}
                onChange={handleChange}
                placeholder="e.g. +1-555-1234"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Image URL
              </label>
              <input
                type="url"
                name="sellerImageUrl"
                value={formData.sellerImageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Row 7: Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Row 8: Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Simple Description about your Product
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough....."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
}
