import useUserAuth from "@/hooks/useUserAuth";
import React, { useContext, useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import { useNavigate } from "react-router";

const PAGE_SIZE = 10; // Define the page size constant
import FilterHeader from "@/components/FilterHeader";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import PollCard from "@/components/PollCard";
import { UserContext } from "@/context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";

function HomePage() {
  const { user } = useContext(UserContext);
  useUserAuth();
  const navigate = useNavigate();
  const [allPolls, setAllPolls] = useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("");

  const fetchAllPolls = async (overridePage = page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.POLLS.GET_ALL_POLLS}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}`
      );
      console.log(response);

      if (response.data?.polls?.length > 0) {
        setAllPolls((prevPolls) =>
          overridePage === 1
            ? response.data.polls
            : [...prevPolls, ...response.data.polls]
        );
        setStats(response.data?.stats || []);
        setHasMore(response.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchAllPolls(1);
    return () => {};
  }, [filterType]);

  useEffect(() => {
    setPage(1);
    fetchAllPolls(1);
    return () => {};
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      fetchAllPolls();
    }
    return () => {};
  }, [page]);


  const loadMorePolls = ()=>{
    setPage((prev)=>prev+1);
  }

  return (
    <DashBoard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <FilterHeader
          title="Polls"
          filterType={filterType}
          setFilterType={setFilterType}
        />

      {/* infinite scroll */} 
      <InfiniteScroll
      dataLength={allPolls.length}
      next={loadMorePolls}
      hasMore={hasMore}
      loader={<h4 className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">Loading...</h4>}
      endMessage={<p className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">No more polls to display.</p>}
      >
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
            creatorName={poll.creator.name}
            creatorUsername={poll.creator.username}
            userHasVoted={poll.userHasVoted || false}
            isPollClosed={poll.closed || false}
            createdAt={poll.createdAt || false}
          />
        ))}
        </InfiniteScroll>
      </div>
    </DashBoard>
  );
}

export default HomePage;
