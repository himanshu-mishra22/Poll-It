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

        {isMyPoll && !pollClosed && (
            <button
            className='w-20 h-10 text-orange-500 bg-orange-500/20 hover:bg-orange-500 hover:text-white hover:border-orange-100'
            onClick={onClosePoll}
            disabled={loading}
            >
                
                {/* {JSON.stringify(isMyPoll)} */}
                Close
            </button>
        )}

            {isMyPoll && (
            <button
            className='w-20 h-10 text-red-500 bg-orange-500/20 hover:bg-red-500 hover:text-white hover:border-orange-100'
            onClick={onDelete}
            disabled={loading}
            >
                
                {/* {JSON.stringify(isMyPoll)} */}
                Delete
            </button>
         )} 

        <button className='text-[20px] text-slate-300 cursor-pointer' onClick={toggleBookmark}>
            {isBookmarked ? (
                <FaBookmark className="text-green-300"/>
            ): (
                <FaRegBookmark/>
            )}
        </button>

        {inputCaptured && !isVoteComplete && (
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
