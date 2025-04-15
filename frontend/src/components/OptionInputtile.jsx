import React from "react";
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

const OptionInputtile = ({ isSelected, label, onSelect }) => {
    const getColor = ()=>{
        if(isSelected) return "text-white bg-green-700 border-green-500";
        return "text-black bg-slate-200/800 border-slate-300";
    }

  return <div>
    <button
        className={`w-full flex items-center gap-2 px-3 py-1 mb-4 border rounded-md ${getColor()}`}
        onClick={onSelect}
    >
        {isSelected ? (
            <MdRadioButtonChecked className="text-lg text-white"/>
        ):(
            <MdOutlineRadioButtonUnchecked className="text-lg text-slate-400" /> 
        )}
    <span className="text-[13px]">{label}</span>
    </button>
  </div>;
};

export default OptionInputtile;
