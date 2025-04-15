import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { getPollBookamrked } from "@/utils/helper";
import UserProfileInfo from "./UserProfileInfo";
import { PollActions } from "./PollActions";
import PollContent from "./PollContent";



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
  const { user } = useContext(UserContext);
  const [selectOptionIndex, setSelectOptionIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [userRes, setUserRes] = useState("");
  const [isVoted, setIsVoted] = useState(userHasVoted);
  const [pollResult, setPollResult] = useState({options, voters,responses, });
  const isPollBookmarked = getPollBookamrked(
    pollId,
    user.bookmarkedPolls || []
  );
  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);


  const handleInput=(value)=>{
    if(type === 'rating') setRating(value);
    else if(type === 'open-ended') setUserRes(value);
    else setSelectOptionIndex(value);
  
  }
  return (
    !pollDeleted && (
      <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
        <div className="flex items-start justify-between">
          <UserProfileInfo 
          imgUrl = {creatorProfilePic}
          name = {creatorName}
          username = {creatorUsername}
          createdAt = {createdAt}
          />

          <PollActions
          pollId = {pollId}
          isVotedComplete = {isVoted}
          inputCaptured = {(userRes || selectOptionIndex >= 0 || rating)}
          onVoteSubmit = {()=>{}}
          isBookmarked = {pollBookmarked}
          toggleBookmark = {()=>{}}
          isMyPoll = {isMyPoll}
          pollClosed = {pollClosed}
          onClosePoll = {()=>{}}
          onDelete = {()=>{}}
          />
        </div>

        <div className="ml-14 mt-3">
          <p className="text-[15px] text-black leading-8">{question}</p>
          <div className="mt-4">
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
          </div>
        </div>

      </div>
    )
  );
};

export default PollCard;
