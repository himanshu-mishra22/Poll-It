import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatAvatar from "./ChatAvatar";
dayjs.extend(relativeTime);

const PollingResultContent = ({ type, options, voters, responses }) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
    case "rating":
      return (
        <>
          {options.map((option, index) => (
            <PollOptionResult
              key={option._id}
              label={`${option.optionText} ${type === "rating" ? "Star" : ""} `}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <ImagePollResult
              key={option._id}
              imgUrl={option.optionText || ""}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </div>
      );

    case "open-ended":
      return responses.map((response) => {
        return (
          <OpenEndedPollResponse
            key={response._id}
            profileImgUrl={response.voterId?.profilePic}
            userFullName={response.voterId?.name || "ABC"}
            response={response.responseText}
            createdAt={
              response.createdAt ? dayjs(response.createdAt).fromNow() : ""
            }
          />
        );
      });

    default:
      return null;
  }

};

const PollOptionResult = ({ label, optionVotes, totalVotes }) => {
  //calculating progress
  const progress =
    totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  return (
    <div className="w-full bg-slate-200/80 rounded-md h-6 relative mb-3">
      <div
        className="bg-sky-900/10 h-6 rounded-md"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4">
        {label} <span className="text-[11px] text-slate-500">{progress}%</span>
      </span>
    </div>
  );
};

const ImagePollResult = ({ imgUrl, optionVotes, totalVotes }) => {
  return (
    <div>
      <div className="w-full bg-gray-800 flex items-center gap-2 mb-4 rouded-md overflow-hidden">
        <img src={imgUrl} alt="" className="w-full h-36 object-contain" />
      </div>

      <PollOptionResult optionVotes={optionVotes} totalVotes={totalVotes} />
    </div>
  );
};

const OpenEndedPollResponse = ({
  profileImgUrl,
  userFullName,
  response,
  createdAt,
}) => {
  return (
    <div className="mb-9 ml-3">
      <div className="flex gap-3">
        {profileImgUrl ? (
          <img src={profileImgUrl} alt="" className="w-8 h-8 rounded-full" />
        ) : (
          <ChatAvatar
            name={userFullName}
            style="text-[10px] bg-sky-800/40"
            width={'w-8'}
            height={'h-8'}
          />
        )}

        <p className="text-[13px] text-[#1a3d2e]">
          {userFullName}{" "}
          <span className="mx-1 text-[10px] text-slate-500">.</span>
          <span className="text-[10px] text-slate-500">{createdAt}</span>
        </p>
      </div>

      <p className="text-xs text-slate-700 -mt-2 ml-[44px]">{response}</p>
    </div>
  );
};

export default PollingResultContent;
