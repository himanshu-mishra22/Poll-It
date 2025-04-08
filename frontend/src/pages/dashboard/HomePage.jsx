import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/context/UserContext";
import useUserAuth from "@/hooks/useUserAuth";
import React, { useContext } from "react";

function HomePage({ activeMenu }) {
  const { user } = useContext(UserContext);
  useUserAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />
      <div className="flex flex-col md:flex-row px-4 md:px-8 py-4 gap-4">
        {/* Sidebar */}
        <div className="md:w-1/5">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-4">Home</h2>
            {/* Add your homepage content here */}
          </div>
        </div>

        {/* User Details - visible only on md and up */}
        {user && (
          <div className="hidden lg:block w-full lg:w-1/4">
            <UserDetails
              profileImageUrl={user.profilePic}
              name={user.name}
              username={user.username}
              totalPollsVotes={user.totalPollsVotes}
              totalPollsCreated={user.totalPollsCreated}
              totalPollsBookmarked={user.totalPollsBookmarked}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
