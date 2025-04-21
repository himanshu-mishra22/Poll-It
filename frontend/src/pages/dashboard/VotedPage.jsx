import useUserAuth from "@/hooks/useUserAuth";
import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
const PAGE_SIZE = 10;
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import PollCard from "@/components/PollCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CREATE_ICON from "@/assets/add-post.png";
import { useNavigate } from "react-router";
import EmptyCard from "@/components/EmptyCard";

function VotedPage() {
  useUserAuth();
  const navigate = useNavigate();
  const [votedPolls, setVotedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async (overridePage = page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.POLLS.VOTED_POLLS}?page=${overridePage}&limit=${PAGE_SIZE}`
      );

      if (response.data?.polls?.length > 0) {
        setVotedPolls((prevPolls) =>
          overridePage === 1
            ? response.data.polls
            : [...prevPolls, ...response.data.polls]
        );
        setHasMore(response.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };


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
    <DashBoard activeMenu="Voted Polls">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Voted Polls</h2>

        {votedPolls.length===0 && !loading && (
          <EmptyCard 
          imgSrc={CREATE_ICON}
          message="You've not voted in any polls yet."
          btnTxt="Vote Poll"
          onClick={()=>navigate("/dashboard")}
          />
        )}

      {/* infinite scroll */} 
      <InfiniteScroll
      dataLength={votedPolls.length}
      next={loadMorePolls}
      hasMore={hasMore}
      loader={<h4 className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">Loading...</h4>}
      endMessage={<p className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">No more polls to display.</p>}
      >
        {votedPolls.map((poll) => (
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

export default VotedPage;
