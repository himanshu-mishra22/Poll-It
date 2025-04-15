import React from 'react'
import ChatAvatar from './ChatAvatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const UserProfileInfo = ({
    imgUrl,name,username,createdAt
}) => {
  return (
    <div className='flex items-center gap-4'>
        {imgUrl ? (
            <img src={imgUrl} alt={name} className='w-10 h-10 rounded-full border-none' />
        ): (
            <ChatAvatar name ={name} style='text-[13px]'/>

        )}

        <div>
            <p className='text-sm text-black font-medium leading-4'>{name}
                <span className='mx-1 text-sm text-slate-500'> - </span>
                <span className='text-sm text-slate-500'>{createdAt && 
                (
                    dayjs(createdAt).fromNow()
                )}
            </span>
            </p>
            <span className='text-[11.5px] text-slate-500 leading-4'>
                @{username}
            </span>
        </div>
    </div>
  )
}

export default UserProfileInfo