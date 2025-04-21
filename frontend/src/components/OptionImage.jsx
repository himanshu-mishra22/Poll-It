import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlus } from "react-icons/hi2";

const OptionImage = ({ imageList, setImageList }) => {
  //adding image function
  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file && imageList.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        //add object with base64 and file to the array
        setImageList([...imageList, { base64: reader.result, file }]);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  //deleting image function
  const handleDeleteImage = (index) => {
    const updatedList = imageList.filter((_,idx)=> idx != index);
    setImageList(updatedList);
  };

  return (
    <div>
      {imageList?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {imageList.map((item, index) => (
            <div
            key={index}
             className="bg-gray-600/10 rounded-md relative">
              <img
              src={item.base64}
              className= "w-full h-36 object-contain rounded-md" />
              <button
                onClick={() => handleDeleteImage(index)}
                className="cursor-pointer text-red-500 bg-gray-100 rounded-full p-2 absolute top-2 right-2"
              >
                <HiOutlineTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* {JSON.stringify(imageList)}; */}

      {imageList.length < 4 && (
        <div className="flex items-center gap-5">
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleAddImage}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="cursor-pointer flex items-center gap-1 text-xs text-nowrap py-[6px]">
            <HiMiniPlus className="text-lg" />
            Select Image
          </label>
        </div>
      )}
    </div>
  );
};

export default OptionImage;
