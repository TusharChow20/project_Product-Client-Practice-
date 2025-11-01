import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";

const Product = ({ product }) => {
  const { title, price_max, price_min, image } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
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
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
        {price_min !== price_max && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
            {Math.round(((price_max - price_min) / price_max) * 100)}% OFF
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
                ${price_max}
              </span>
            ) : (
              <>
                <h1 className="text-lg font-bold text-gray-900">
                  Price: ${price_min} -${price_max}
                </h1>
              </>
            )}
          </div>
          <button className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-300 active:scale-95 transform shadow-md hover:shadow-lg">
            <ShoppingCart size={14} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
