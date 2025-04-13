import React from 'react'

const ChatAvatar = ({width, height, style, name}) => {
    const getInital = (name)=>{
        if(!name) return "";

        const words = name.split(" ");
        let initial = "";

        for(let i=0;i<Math.min(words.length,2);i++){
            initial += words[i][0];
        }
        return initial.toUpperCase();
    }

  return (
    <div className={`${width || 'w-12' } ${height || 'h-12'}  ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInital(name || "")}
        </div>
  )
}

export default ChatAvatar