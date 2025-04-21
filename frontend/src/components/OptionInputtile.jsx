import React from "react";
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

const OptionInputtile = ({ isSelected, label, onSelect }) => {
    const getColor = ()=>{
        if(isSelected) return "bg-[#1a3d2e] border-green-500 text-[#DF6D14]";
        return "text-black bg-slate-200/800 border-slate-300";
    }

  return <div>
    <button
        className={`w-full flex items-center gap-2 px-3 py-1 mb-4 border rounded-md ${getColor()}`}
        onClick={onSelect}
    >
        {isSelected ? (
            <MdRadioButtonChecked className="text-lg text-[#DF6D14]"/>
        ):(
            <MdOutlineRadioButtonUnchecked className="text-lg text-slate-400" /> 
        )}
    <span className="text-[13px]">{label}</span>
    </button>
  </div>;
};

export default OptionInputtile;
