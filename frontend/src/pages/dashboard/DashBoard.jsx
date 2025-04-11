import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/context/UserContext";
import useUserAuth from "@/hooks/useUserAuth";
import React, { useContext } from "react";

const DashBoard = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
  useUserAuth();
  return (
    <div>
      <Navbar />

      <div className="flex"> 
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
        <div className="hidden md:block mr-5">
            <UserDetails
            profileImageUrl={user && user.profilePic}
            name={user && user.name}
            username={user && user.username}
            totalPollsBookmarked={user && user.totalPollsBookmarked}
            totalPollsCreated={user && user.totalPollsCreated}
            totalPollsVotes={user && user.totalPollsVotes}
            />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
