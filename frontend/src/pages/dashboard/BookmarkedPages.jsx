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
import toast from "react-hot-toast";

function BookmarkedPages() {
  useUserAuth();
  const navigate = useNavigate();
  const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async (overridePage = page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.POLLS.GET_BOOKMARKED}?page=${overridePage}&limit=${PAGE_SIZE}`
      );

      if (response.data?.bookmarks?.length > 0) {
        setBookmarkedPolls((prevPolls) =>
          overridePage === 1
            ? response.data.bookmarks
            : [...prevPolls, ...response.data.bookmarks]
        );
        setHasMore(response.data.bookmarks.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast.error('Oh snap! Some error occurred')
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
    <DashBoard activeMenu="Bookmarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Bookmarked Polls</h2>

        {bookmarkedPolls.length===0 && !loading && (
          <EmptyCard 
          imgSrc={CREATE_ICON}
          message="You've not bookmarked any poll yet."
          btnTxt="Explore"
          onClick={()=>navigate("/dashboard")}
          />
        )}

      {/* infinite scroll */} 
      <InfiniteScroll
      dataLength={bookmarkedPolls.length}
      next={loadMorePolls}
      hasMore={hasMore}
      loader={<h4 className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">Loading...</h4>}
      endMessage={<p className="text-sm text-black font-medium text-center p-3 bg-gray-100 rounded-lg">No more polls to display.</p>}
      >
        {bookmarkedPolls.map((poll) => (
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

export default BookmarkedPages;
