import React, { use } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, Chrome } from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";

const Login = () => {
  const { signInWithGoogle } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch("https://deal-product-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("data after user save", data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 transform transition-all duration-500 hover:shadow-purple-200/50 hover:shadow-3xl">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-6">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Sign in to continue to Deal-Product</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 backdrop-blur-sm bg-white/80 border-2 border-gray-200/50 rounded-xl py-3 px-4 hover:bg-white hover:border-purple-300 hover:shadow-lg transition-all duration-300 font-medium text-gray-700 group"
          >
            <Chrome className="w-5 h-5 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-sm sm:text-base">Sign in with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 backdrop-blur-sm bg-white/70 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2 transform transition-all duration-300 hover:translate-x-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 group-focus-within:text-purple-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-2 transform transition-all duration-300 hover:translate-x-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 group-focus-within:text-purple-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition-all duration-300 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-all duration-300 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 backdrop-blur-sm bg-white/40 rounded-lg py-3 px-4">
          Protected by reCAPTCHA and subject to the Deal-Product{" "}
          <a href="#" className="text-purple-600 hover:underline transition-all duration-300">
            Privacy Policy
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        /* Enhanced responsiveness */
        @media (max-width: 640px) {
          .backdrop-blur-xl {
            backdrop-filter: blur(16px);
          }
        }

        /* Smooth animations for better performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

export default Login;