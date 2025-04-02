import React from 'react';
import { CiUser } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = React.useRef(null)
    const [preview, setPreview] = React.useState(null);



    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if(file){
            //update the image state
            setImage(file);
            //create a preview url for the image
            const preview =URL.createObjectURL(file);
            setPreview(preview);
        }
    };
    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreview(null);

    };
    const onChooseFile = (e)=>{
        e.preventDefault();
        inputRef.current.click();
    };



  return (
    <div className=' flex justify-center mb-6'>
        <input
         type="file"
         accept='image/*'
         ref={inputRef}
         onChange={handleImageChange}
         className='hidden'
         />

        {!image ? ( <div className='w-20 h-20 flex items-center  cursor-pointer justify-center rounded-full bg-[#f9f9f9f7] border-2 border-gray-300 relative'>
            <CiUser className='text-6xl text-gray-500'/>
            <button 
            className='w-8 h-8 flex items-center cursor-pointer justify-center bg-[#0a2017de] text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
            type="button"><LuUpload/></button>
         </div> ): 

         (<div className='relative'>
            <img
            src={preview}
            alt="Profile pic"
            className='w-20 h-20 rounded-full object-cover'
             />
              <button 
            className='w-8 h-8 flex items-center cursor-pointer justify-center bg-[#5b2616de] text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
            type="button"><FaRegTrashCan /></button>
         </div>)}
    </div>
  )
}

export default ProfilePhotoSelector