import React from "react";

const EmptyCard = ({ imgSrc, message, btnTxt, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-xl flex flex-col items-center justify-center text-center p-6 md:p-10 space-y-6 mt-10 mx-auto max-w-md">
      <img src={imgSrc} alt="Empty State" className="w-32 md:w-44" />
      
      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
        {message}
      </p>

      {btnTxt && (
        <button
          onClick={onClick}
          className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2 rounded-lg transition duration-300"
        >
          {btnTxt}
        </button>
      )}
    </div>
  );
};

export default EmptyCard;
