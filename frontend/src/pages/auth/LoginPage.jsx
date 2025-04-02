import React, { useState } from "react";
import pic from "../../assets/bg-signup.png";
import { Link } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { validateEmail } from "../../utils/Validate.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



//handle login from submit...
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if(!password) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");

    //login function...
  };

  //to toggle show password funnctionality...
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Signin Form */}
      <div className="w-1/2 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-4xl text-[#1a3d2e] font-bold mb-6">
          Welcome Back!
        </h1>
        <p className="text-lg mb-8 font-bold text-[#1a3d2e]">
          Sign In to your account
        </p>

        <form
          className="w-full h-full flex flex-col justify-center items-center"
          onSubmit={handleLoginSubmit}
        >
          <div className="w-3/4 space-y-5">
            <div>
              <label className="block  font-bold text-[#1a3d2e]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full p-2 border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block  font-bold text-[#1a3d2e]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 w-full p-2 pr-10 border rounded-md bg-gray-200 text-black"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FaRegEye size={20} />
                  ) : (
                    <LuEyeClosed size={20} />
                  )}
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-[#1a3d2e] hover:bg-green-800"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-6 text-black">
          New here?{" "}
          <Link
            to={"/signup"}
            className="text-[#1a3d2e] hover:text-green-800 underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 h-full">
        <img
          src={pic}
          alt="Signup Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
