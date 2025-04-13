import Navbar from "@/components/Navbar";
import SideMenu from "@/components/SideMenu";
import UserDetails from "@/components/UserDetails";
import { UserContext } from "@/context/UserContext";
import useUserAuth from "@/hooks/useUserAuth";
import React, { useContext, useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import { useNavigate } from "react-router";

const PAGE_SIZE = 10; // Define the page size constant
import FilterHeader from "@/components/FilterHeader";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import PollCard from "@/components/PollCard";

function HomePage() {
  // const { user } = useContext(UserContext);
  useUserAuth();
  const navigate = useNavigate();
  const [allPolls, setAllPolls]= useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");

  const fetchAllPolls = async(overridePage = page)=>{
      if(loading) return;
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          `${API_PATHS.POLLS.GET_ALL_POLLS}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}`
        )

        if(response.data?.polls?.length > 0){
          setAllPolls((prevPolls)=> overridePage === 1 ? response.data.polls : [...prevPolls, ...response.data.polls])
          setStats(response.data?.stats || []);
          setHasMore(response.data.polls.length === PAGE_SIZE)
        }else{
            setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false);
      }
  }

  useEffect(()=>{
    setPage(1);
    fetchAllPolls(1);
    return ()=>{};
  },[filterType]);


  useEffect(()=>{
    setPage(1);
    fetchAllPolls(1);
    return ()=>{};
  },[page]);

  useEffect(()=>{
    if(page !== 1){
      fetchAllPolls();
    }
    return ()=>{};
  },[page]);


  return (
   <DashBoard activeMenu='Dashboard'>
    <div className="my-5 mx-auto">
      <FilterHeader
      title="Polls"
      filterType={filterType}
      setFilterType={setFilterType}
      />
      {allPolls.map((poll) => (
        <PollCard
        key={`dashboard_${poll._id}`}
        pollId={poll._id}
        question={poll.question}
        type={poll.type}
        options={poll.options}
        voters={poll.voters.length || 0}
        responses={poll.responses || []}
        creatorProfilePic={poll.creator.profilePic || null}
        creatorName = {poll.creator.name}
        creatorUsername = {poll.creator.username}
        userHasVoted = {poll.userHasVoted || false}
        isPollClosed = {poll.closed || false}
        createdAt = {poll.createdAt || false}
        />
      ))}
    </div>
   </DashBoard>
  );
}

export default HomePage;
