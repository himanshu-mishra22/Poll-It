import { UserContext } from '@/context/UserContext';
import { SIDE_MENU_DATA } from '@/utils/sideMenuLayout';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  const handleClick = (r) => {
    if (r === 'logout') {
      handleLogout();
      return;
    }

    navigate(r);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate("/login");
  };

  return (
    <div className="hidden md:block md:w-64 md:h-[calc(100vh-61px)] bg-slate-50/50 border-r border-slate-100/70 p-5 sticky top-[61px] z-20">
      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-4 text-[15px] transition-all duration-200
            ${activeMenu === item.label
              ? "text-[#DF6D14] bg-[#1a3d2e]"
              : "text-[#1a3d2e] hover:bg-slate-200"} 
            py-4 px-6 rounded-full mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
