const express= require('express');
const {registerUser, loginUser, getUSerInfo} = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();



router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/getUser', protect,getUSerInfo);
router.post('/upload-image', upload.single('image'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }

    const imgUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({message:"File uploaded successfully", imgUrl});
    // console.log(req.file);
})



module.exports = router;