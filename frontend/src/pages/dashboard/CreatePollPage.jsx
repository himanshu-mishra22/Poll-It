import React, { useContext, useState } from "react";
import DashBoard from "./DashBoard";
import useUserAuth from "@/hooks/useUserAuth";
import { UserContext } from "@/context/UserContext";
import { POLL_TYPE } from "@/utils/pollType";
import OptionInput from "@/components/OptionInput";
import OptionImage from "@/components/OptionImage";

function CreatePollPage() {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //creating new poll
  const handleCreatePoll = ()=>{
    const {question,type,options,imageOptions,error} = pollData;

    //validation
    if(!question || !type){
      console.log({question,type,options,imageOptions,error});
      handleValueChange("error","Question & Type are required");
      return;
    }

    if(type == 'single-choice' && options.length < 2){
      handleValueChange("error","Enter atleast two options");
      return;
    }
    if(type == 'image-based' && imageOptions.length < 2){
      handleValueChange("error","Enter atleast two images");
      return;
    }

    handleValueChange("error", "");
  }

  return (
    <DashBoard activeMenu="Create Poll">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Poll</h2>
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">Question</label>
          <textarea
            className="w-full text-[13px] text-black outline-none
          bg-slate-200/80 p-2 rounded-md mt-2"
            placeholder="What's on your mind?"
            rows={4}
            value={pollData.question}
            onChange={({ target }) =>
              handleValueChange("question", target.value)
            }
          />
        </div>

        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">
            Poll type
          </label>
          <div className="flex gap-4 flex-wrap mt-3">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                className={`
               ${
                 pollData.type === item.value
                   ? "text-white bg-black border-black"
                   : "border-sky-100"
               } cursor-pointer`}
                onClick={() => {
                  handleValueChange("type", item.value);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* single-choice type */}
        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              Options
            </label>

            <div className="mt-3">
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => {
                  handleValueChange("options", value);
                }}
              />
            </div>
          </div>
        )}

        {/* image-based type */}
        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600">
              Image options
            </label>

            <div className="mt-3">
              <OptionImage
                imageList={pollData.imageOptions}
                setImageList={(value) => {
                  handleValueChange("imageOptions", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className="text-xs font-medium text-red-500 mt-5">
            {pollData.error}
          </p>
        )}

        <button
        className="bg-green-600 rounded-md w-15 p-2 py-2 mt-6 hover:bg-green-700"
        onClick={handleCreatePoll}
        >
          Create
        </button>

      </div>
    </DashBoard>
  );
}

export default CreatePollPage;
