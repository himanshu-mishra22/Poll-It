import { UserContext } from '@/context/UserContext';
import { SIDE_MENU_DATA } from '@/utils/sideMenuLayout'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'

const SideMenu = ({activeMenu}) => {

    const navigate = useNavigate();
    const {clearUser} = useContext(UserContext);

    const handleClick=(r)=>{
        if(r == 'logout'){
            handleLogout();
            return;
        }

        navigate(r)
    }

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        clearUser();
        navigate("/login");
    }



  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-slate-50/50 border-r border-slate-100/70 p-5 sticky top-[61] z-20 '>
        {SIDE_MENU_DATA.map((item)=>(
            <button 
            key={item.id}
            className={`w-full flex items-center gap-4 text-[15px] 
             ${activeMenu == item.label ? "text-white bg-[#1a3d2e]" :""}  py-4 px-6 rounded-full mb-3`}
             onClick={()=>handleClick(item.path)}
            ><item.icon className='text-xl'/>{item.label}</button>
        ))}
        </div>
  )
}

export default SideMenu