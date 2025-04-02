import React from "react";
import pic from "../../assets/bg-signup.png";
import { Link } from "react-router";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";
import { validateEmail } from "../../utils/Validate.js";

function SignUpPage() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [error, setError] = React.useState("");

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

    //login function...
  };

  return (
    <div className="flex h-full w-full">
      {/* Left Side - Signup Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#1a3d2e] text-white p-10">
        <h1 className="text-4xl font-bold mb-6">Join Us Now</h1>
        <p className="text-lg mb-8 text-gray-300">
          Create your account and start your journey
        </p>

        <form className="w-3/4 space-y-5" onSubmit={handleSignup}>
          <div className="mb-4">
            <ProfilePhotoSelector
              image={profilePhoto}
              setImage={setProfilePhoto}
            />
          </div>
          <div>
            <label className="block text-gray-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="mt-2 w-full border rounded-md  p-1 bg-gray-200 text-black"
            />
          </div>
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Something unique"
              className="mt-2 w-full border rounded-md  p-1 bg-gray-200 text-black"
            />
          </div>
          <div>
            <label className="block text-gray-300">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-1 border rounded-md bg-gray-200 text-black"
            />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 w-full p-1 border rounded-md bg-gray-200 text-black"
            />
          </div>
          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full p-1 rounded-md bg-green-600 hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-gray-300">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-400 underline">
            Sign In
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

export default SignUpPage;
