import React, { useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6'

export const PollActions = ({
    isVoteComplete,
    inputCaptured,
    onVoteSubmit,
    isBookmarked,
    toggleBookmark,
    isMyPoll,
    pollClosed,
    onClosePoll,
    onDelete,
}) => {
    const [loading,setLoading] = useState(false);
    const handleVoteClick = async()=>{
        setLoading(true);
        try {
            await onVoteSubmit();
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='flex items-center gap-4'>
        {(isVoteComplete || pollClosed) && (
            <div className='text-[11px] font-medium text-slate-600 bg-sky-700/10 px-3 py-1 rounded-md'>
                {pollClosed ? "Closed" : "Voted"}
            </div>
        )}

        <button className='text-[20px] text-slate-300 cursor-pointer' onClick={toggleBookmark}>
            {isBookmarked ? (
                <FaBookmark classsName="text-green-300"/>
            ): (
                <FaRegBookmark/>
            )}
        </button>

        { inputCaptured && !isVoteComplete && (
            <button className='w-20 h-10 bg-green-500 text-black ml-auto'
            onClick={handleVoteClick}
            disabled={loading}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        )}
    </div>
  )
}
