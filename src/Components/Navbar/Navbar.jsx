import { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, Search, Bell, User } from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";

export default function Navbar() {
  const { user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Deal-Product
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </NavLink>
            <NavLink
              to="/allProducts"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              All Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/myProducts"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
                >
                  My Products
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </NavLink>
                <NavLink
                  to="/myBids"
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
                >
                  My Bids
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                </NavLink>
              </>
            )}
            <NavLink
              to="/createProduct"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Create Product
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </NavLink>
          </div>
          <div>
            {user ? (
              <button className="btn">Sign Out</button>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to={"/login"}
                  className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Home
              </NavLink>
              <NavLink
                to="/allProducts"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                All Products
              </NavLink>
              <NavLink
                to="/my-products"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                My Products
              </NavLink>
              <NavLink
                to="/my-bids"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                My Bids
              </NavLink>
              <NavLink
                to="/create-product"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Create Product
              </NavLink>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200/50">
                <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-all mx-4">
                  Login
                </button>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all mx-4">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
