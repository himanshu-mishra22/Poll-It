import React from 'react'
import StatsInfo from './StatsInfo'
import ChatAvatar from './ChatAvatar'

const UserDetails = (
    {profileImageUrl,
        name,
        username,
        totalPollsVotes,
        totalPollsCreated,
        totalPollsBookmarked}
) => {
  return (
    <div className='bg-slate-100/50 rounded-lg mt-16 sticky top-[61px] z-20'>
        <div className='w-full h-32 bg-[url("assets/info-bg.jpg")] bg-cover flex justify-center bg-[#1a3d2e] relative'>
            <div className='absolute -bottom-10 rounded-full overflow-hidden border-2 border-primary'>
               {profileImageUrl ? ( <img
                 src={profileImageUrl || null}
                 alt="Profile Picture" 
                 className='w-20 h-20 bg-slate-400 rounded-full'
                 />)
                :
                (<ChatAvatar name={name} width='w-20' height='h-20' style='text-xl' />)}
            </div>
        </div>
        <div className='mt-12 px-5'>
            <div className='text-center pt-1'>
                <h5 className='text-lg text-gray-950 font-medium loading-6'>
                    {name}
                </h5>
                <span className='text-[13px] font-medium text-slate-700/60'>
                @{username}
                </span>
            </div>
            <div className='flex items-center justify-center gap-5 flex-wrap my-6'>
                <StatsInfo label='Polls Created' value={totalPollsCreated || 0} />
                <StatsInfo label='Polls Voted' value={totalPollsVotes || 0} />
                <StatsInfo label='Polls Bookmarked' value={totalPollsBookmarked || 0} />
            </div>
        </div>
    </div>
  )
}

export default UserDetails