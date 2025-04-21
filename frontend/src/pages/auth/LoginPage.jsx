import React, { useContext, useState } from "react";
import pic from "../../assets/login.png";
import { Link, useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { validateEmail } from "../../utils/Validate.js";
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);


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
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong");
      }
      
    }
  }
  //to toggle show password funnctionality...
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen bg-gradient-to-br from-[#e0f7f1] to-[#f8f8f8]">
    {/* Left Side - Signin Form */}
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-white p-6 md:p-10 bg-white">
    <h1 className="text-6xl md:text-9xl text-[#1a3d2e] font-bold mb-4 md:mb-6">Poll It!</h1>
      <h3 className="text-3xl md:text-4xl text-[#1a3d2e] font-bold mb-4 md:mb-6">
        Welcome Back
      </h3>
      <p className="text-base md:text-lg mb-6 md:mb-8 font-bold text-[#1a3d2e]">
        Sign In to your account
      </p>
  
      <form
        className="w-full max-w-md space-y-5"
        onSubmit={handleLoginSubmit}
      >
        <div>
          <label className="block font-bold text-[#1a3d2e]">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 w-full p-2 border rounded-md bg-gray-200 text-black"
          />
        </div>
        <div>
          <label className="block font-bold text-[#1a3d2e]">Password</label>
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
          className="w-full p-2 rounded-md bg-[#1a3d2e] hover:bg-[#DF6D14] hover:text-[#1a3d2e]"
        >
          Sign In
        </button>
      </form>
  
      <p className="mt-6 text-black">
        New here?{" "}
        <Link
          to={"/signup"}
          className="text-[#1a3d2e] hover:text-[#DF6D14] underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  
    {/* Right Side - Image */}
    <div className="hidden md:block w-1/2 h-full">
      <img
        src={pic}
        alt="Login Image"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  
  );
}

export default LoginPage;
