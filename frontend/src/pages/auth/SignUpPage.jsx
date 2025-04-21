import React, { useContext, useState } from "react";
import pic from "../../assets/signup.png";
import { Link, useNavigate } from "react-router";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";
import { validateEmail } from "../../utils/Validate.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

function SignUpPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setprofilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter a name");
      return;
    }
    if (!username) {
      setError("Please enter a username");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!password) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");

    //signup function...
    try {
    // uploading image to server...
    let imgUrl = "";
    if(profilePic) {
      const imgUploadRes = await uploadImage(profilePic);
      imgUrl = imgUploadRes.imgUrl || "";
    }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        username,
        email,
        password,
        profilePic: imgUrl,
      });

      const { token, user } = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
   
    }  catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
  {/* Left Side - Signup Form */}
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#1a3d2e] text-white p-6 md:p-10 flex-1">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Join Us Now</h1>
    <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-300 text-center">
      Create your account and start your journey
    </p>

    <form className="w-full max-w-md space-y-5" onSubmit={handleSignup}>
      <div className="mb-4">
        <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
      </div>
      <div>
        <label className="block text-gray-300">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="mt-2 w-full border rounded-md p-2 bg-gray-200 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-300">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter something unique"
          className="mt-2 w-full border rounded-md p-2 bg-gray-200 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-300">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="mt-2 w-full border rounded-md p-2 bg-gray-200 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-300">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-2 w-full border rounded-md p-2 bg-gray-200 text-black"
        />
      </div>
      {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-green-600 hover:bg-[#DF6D14] hover:text-[#1a3d2e] transition-colors"
      >
        Sign Up
      </button>
    </form>

    <p className="mt-4 md:mt-6 text-gray-300 text-center">
      Already have an account?{" "}
      <Link to={"/login"} className="text-green-400 underline hover:text-[#DF6D14]">
        Sign In
      </Link>
    </p>
  </div>

  {/* Right Side - Image */}
  <div className="hidden md:block w-1/2 h-full">
    <img
      src={pic}
      alt="Signup Image"
      className="w-full h-full object-cover"
    />
  </div>
</div>


  );
}

export default SignUpPage;
