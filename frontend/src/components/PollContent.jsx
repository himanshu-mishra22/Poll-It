import React from 'react'
import OptionInputtile from './OptionInputtile';
import Rating from './Rating';
import ImageOptionTile from './ImageOptionTile';

const PollContent = ({
              type,
              options,
              selectOptionIndex,
              onOptionSelect,
              rating,
              onRatingChange,
              userResponse,
              onResponseChange,
}) => {
  
    switch (type){
        case "single-choice":
            case "yes/no": return (
                <>
                {options.map((option,index)=>(
                    <OptionInputtile
                    key={option._id}
                    isSelected={selectOptionIndex == index}
                    label = {option.optionText || ""}
                    onSelect={()=> onOptionSelect(index)}
                    />
                ))}
                </>
            );

            case "rating":
                return <Rating value={rating} onChange={onRatingChange}/>

            case "open-ended": return (
                <div className='-mt-3'>
                    <textarea rows={4} value={userResponse} placeholder='Your response'
                     className='w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2'
                     onChange={({target}) => onResponseChange(target.value) }></textarea>
                </div>
            );

            case "image-based":
                return (
                    <div className='grid grid-cols-2 gap-4'>
                        {options.map((option,index)=>(
                            <ImageOptionTile
                            key={option._id}
                            isSelected={selectOptionIndex === index}
                            imgUrl={option.optionText || ""}
                            onSelect={()=>onOptionSelect(index)}
                            />
                        ))}
                    </div>
                )


            default: null;
    }
}

export default PollContent