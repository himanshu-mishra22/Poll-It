import { POLL_TYPE } from "@/utils/pollType";
import React, { useState } from "react";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";

const FilterHeader = ({ title, filterType, setFilterType }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="md:text-lg font-medium text-black">{title}</h2>

        <button
          className={`flex items-center gap-3 text-sm py-2 ${
            open ? "rounded-t-lg" : "rounded-lg"
          } bg-green-500 p-3`}
          onClick={() => {
            if (filterType !== "") setFilterType("");
            setOpen(!open);
          }}
        >
          {filterType !== "" ? (
            <>
              <IoCloseOutline className="text-lg" />
              Clear
            </>
          ) : (
            <>
              <IoFilterOutline className="text-lg" />
              Filter
            </>
          )}
        </button>
      </div>

      {open && (
        <div className=" flex flex-wrap gap-4 bg-green-500 p-4 rounded-l-lg rounded-b-lg">
            {[{
                label:"All",
                value:""},
                ...POLL_TYPE].map((type)=>(
                    <button 
                    key={type.value}
                    className={`text-[12px] px-4 py-1 rounded-lg text-nowrap ${
                        filterType === type.value ? "bg-yellow-500 text-white" : "bg-white text-[13px]"
                    }`}
                    onClick={() => setFilterType(type.value)}
                    >
                        {type.label}
                    </button>
                ))}
                </div>
      )}
    </div>
  );
};

export default FilterHeader;
