import { useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Deal
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Get Started
            </button>
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
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Portfolio
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 hover:bg-gray-50 rounded-lg"
              >
                Contact
              </a>
              <div className="flex items-center justify-around pt-4 border-t border-gray-200/50">
                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all mx-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
