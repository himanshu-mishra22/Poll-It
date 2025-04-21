const express= require('express');
const {registerUser, loginUser, getUSerInfo} = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const {renameSync} = require("fs")
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();



router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/getUser', protect,getUSerInfo);
router.post('/upload-image', upload.single('image'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    const date=Date.now();
    console.log(date);
    let filedir=`uploads`
    let filename=`${filedir}/${date}${req.file.originalname}`
    renameSync(req.file.path,filename)
    const imgUrl = `${req.protocol}://${req.get('host')}/${filename}`;
    res.status(200).json({message:"File uploaded successfully", imgUrl});
    // console.log(req.file);
})



module.exports = router;