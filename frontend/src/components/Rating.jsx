import React, { useState } from 'react'
import { HiMiniStar } from 'react-icons/hi2'

const Rating = ({maxStar =5,
    value=0, onChange, readOnly=false
}) => {

    const [hoverValue,setHoverValue] = useState(0);

    const handleClick = (rating)=>{
        if(!readOnly && onChange){
            onChange(rating);
        }
    };

    const handleMouseEnter = (rating)=>{
        if(!readOnly){
            setHoverValue(rating);
        }
    }

    const handleMouseLeave = ()=>{
        if(!readOnly){
            setHoverValue(0);
        }
    }

  return (
    <div className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"} `}>
       {[...Array(maxStar)].map((_, index) => {
        const startValue = index + 1;
        return (
          <span
           key={startValue} 
           className={`text-3xl transition-colors ${startValue <= (hoverValue||value) ? "text-yellow-300": "text-gray-400"}`}
           onClick={()=>handleClick(startValue)}
           onMouseEnter={()=>handleMouseEnter(startValue)}
           onMouseLeave={()=>handleMouseLeave}
           >
            <HiMiniStar />
          </span>
        );
       })}
    </div>
  )
}

export default Rating