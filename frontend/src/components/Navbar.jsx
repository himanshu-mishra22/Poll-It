import { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <nav className="flex items-center fixed  justify-between p-4 bg-[#F1F0E9] shadow-md w-full z-20 ">
      {/* Hamburger for mobile */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Logo */}
      <h2 className="text-lg font-medium text-black">Poll It</h2>

      {/* Mobile SideMenu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-md z-30">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
}
