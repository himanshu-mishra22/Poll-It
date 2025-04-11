import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/context/UserContext";
import useUserAuth from "@/hooks/useUserAuth";
import React, { useContext } from "react";
import DashBoard from "./DashBoard";

function HomePage({ activeMenu }) {
  // const { user } = useContext(UserContext);
  useUserAuth();

  return (
   <DashBoard activeMenu='Dashboard'>
    <div>Home</div>
   </DashBoard>
  );
}

export default HomePage;
