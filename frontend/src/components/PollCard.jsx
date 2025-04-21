import { UserContext } from "@/context/UserContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import UserProfileInfo from "./UserProfileInfo";
import { PollActions } from "./PollActions";
import PollContent from "./PollContent";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import PollingResultContent from "./PollingResultContent";
import toast from "react-hot-toast";

const PollCard = ({
  pollId,
  question,
  type,
  options,
  voters,
  responses,
  creatorProfilePic,
  creatorName,
  creatorUsername,
  userHasVoted,
  isMyPoll,
  isPollClosed,
  createdAt,
}) => {
  const { user, onUserVoted, toggleBookmarkId,onPollCreateOrDelete } = useContext(UserContext);
  const getPollBookmarked = (pollId, userBookmark) => {
    return userBookmark.includes(pollId);
  };
  const [selectOptionIndex, setSelectOptionIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [userRes, setUserRes] = useState("");
  const [isVoted, setIsVoted] = useState(userHasVoted);
  const [pollResult, setPollResult] = useState({ options, voters, responses });
  const isPollBookmarked = getPollBookmarked(
    pollId,
    user?.bookmarks|| []
  );
  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);

  const handleInput = (value) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserRes(value);
    else setSelectOptionIndex(value);
  };

  //genrerating poll data based on poll type
  const getPostData = useCallback(() => {
    if (type === "rating") {
      return { optionIndex: rating - 1, voterId: user._id };
    }
    if (type === "open-ended") {
      return { responseText: userRes, voterId: user._id };
    }

    return { optionIndex: selectOptionIndex, voterId: user._id };
  }, [type, userRes, rating, selectOptionIndex, user]);

  //retriviing poll details by ID
  const getPollDetail = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POLLS.GET_BY_ID(pollId)
      );

      if (response.data) {
        const pollDetails = response.data;
        setPollResult({
          options: pollDetails.options || [],
          voters: pollDetails.voters.length || 0,
          responses: pollDetails.responses || [],
        });
      }
    } catch (error) {
      toast.error('Oh snap! Some error occurred')
    }
  };

  //handle  the submission of votes
  const handleVoteSubmit = async () => {
    try {
      const res = await axiosInstance.post(
        API_PATHS.POLLS.VOTE(pollId),
        getPostData()
      );

      getPollDetail();
      setIsVoted(true);
      onUserVoted();
      //toast
      toast.success('Poll Voted')
    } catch (error) {
      toast.error('Poll already voted')
    }
  };

  //toggle the bookmark status of a poll
  const toggleBookmark = async () =>{
    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.BOOKMARK(pollId));
      toggleBookmarkId(pollId);
      setPollBookmarked((prev)=> !prev);
      console.log(response);
      
      //toast
      toast.success(response.data.message)
    } catch (error) {
      toast.error('Oh snap! Some error occurred')
    }
  }

  useEffect(() => {
    setIsVoted(userHasVoted);
  }, [userHasVoted]);

  const closePoll =async ()=>{
    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CLOSE(pollId));
      if(response.data){
        setPollClosed(true);
        //toast
        toast.success('Poll closed')
      }
    } catch (error) {
      toast.error('Oh snap! Some error occurred')
      
    }
  }
  const deletePoll =async ()=>{
    try {
      const response = await axiosInstance.delete(API_PATHS.POLLS.DELETE(pollId));
      if(response.data){
        setPollDeleted(true);
        onPollCreateOrDelete();
        //toast
        toast.success('Poll deleted')
      }
    } catch (error) {
      toast.error('Oh snap! Some error occurred')
      
    }
  }

  return (
    !pollDeleted && (
      <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
        <div className="flex items-start justify-between">
          <UserProfileInfo
            imgUrl={creatorProfilePic}
            name={creatorName}
            username={creatorUsername}
            createdAt={createdAt}
          />   

          <PollActions
            pollId={pollId}
            isVotedComplete={isVoted}
            inputCaptured={userRes || selectOptionIndex >= 0 || rating}
            onVoteSubmit={handleVoteSubmit}
            isBookmarked={pollBookmarked}
            toggleBookmark={toggleBookmark}
            isMyPoll={isMyPoll}
            pollClosed={pollClosed}
            onClosePoll={closePoll}
            onDelete={deletePoll}
          />
        </div>

        <div className="ml-14 mt-3">
          <p className="text-[15px] text-[#1a3d2e] leading-8">{question}</p>
          <div className="mt-4">
            {isVoted || isPollClosed ? (
              <PollingResultContent
              type={type}
              options={pollResult.options || []}
              voters={pollResult.voters}
              responses={pollResult.responses || []}
              />
            ) : (
              <PollContent
                type={type}
                options={options}
                selectOptionIndex={selectOptionIndex}
                onOptionSelect={handleInput}
                rating={rating}
                onRatingChange={handleInput}
                userResponse={userRes}
                onResponseChange={handleInput}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PollCard;
