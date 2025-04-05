import { LuLayoutDashboard, LuPenTool, LuBadgeCheck, LuBookmark, LuLogOut } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
export const SIDE_MENU_DATA = [
    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/dashboard",
    },
    {
        id:"02",
        label:"Create Poll",
        icon:IoCreateOutline,
        path:"/create-poll",
    },
    {
        id:"03",
        label:"My Polls",
        icon:LuPenTool,
        path:"/my-polls",
    },
    {
        id:"04",
        label:"Voted Polls",
        icon:LuBadgeCheck,
        path:"/voted-polls",
    },
    {
        id:"05",
        label:"Bookmarks",
        icon:LuBookmark,
        path:"/bookmarks",
    },
    {
        id:"06",
        label:"Logout",
        icon:LuLogOut,
        path:"logout",
    },
];