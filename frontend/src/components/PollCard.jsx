import { UserContext } from '@/context/UserContext'
import React, { useContext, useState } from 'react'

const PollCard = ({
    pollId, question,type,options,voters,responses, creatorProfilePic, creatorName, creatorUsername, userHasVoted,isPollClosed,createdAt
}) => {

    const {user} = useContext(UserContext);
    const [selectOptionIndex, setSelectOptionIndex] = useState(-1);
    const [rating, setRating] = useState(0);
    const [userRes, setUserRes] = useState("");
    const [isVoted, setIsVoted] = useState(userHasVoted);
    const [pollResult, setPollResult] = useSTate({
        options,
        voters,
        responses
    });

    const isPollBookmarked = getPollBookmarked(pollId,user.bookmarkedPolls || []);


  return (


    <div className=''>
        {question}
    </div>
  )
}

export default PollCard