const multer = require('multer');
const path = require('path');

//configure multer storage
const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },

    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

//file filter to only accept images
const fileFilter = (req, file,cb)=>{
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type, only JPG, JPEG and PNG are allowed'), false);
    }
};

const upload = multer({storage, fileFilter, limits:{fileSize: 1024 * 1024 * 10}});
module.exports = upload;