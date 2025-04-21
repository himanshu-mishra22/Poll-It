import { UserContext } from '@/context/UserContext'
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';

const useUserAuth = () => {
    const {user,updateUser,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user) return;
        // console.log("first");
        let isMounted = true;
        const fetchUserInfo = async() =>{
            try {
               const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
               console.log(response);
               if(isMounted && response.data){
                updateUser(response.data);
               }
            } catch (error) {
                console.log("Failed user info: " ,error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo();
        return ()=>{
            isMounted = false;
        };
    },[user,updateUser,clearUser,navigate]);
  return (
    <div>useUserAuth</div>
  )
}

export default useUserAuth