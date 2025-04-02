//1:17:03
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Function to generate JWT token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1d'});
}

// Function to register a new user
exports.registerUser = async (req, res)=>{
    const {name, username, email, password, profilePic} = req.body;
    if(!name || !username || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    try {
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"Email already exists"});
        }
        const usernameExist = await User.findOne({username});
        if(usernameExist){
            return res.status(400).json({message:"Username already exists"});
        }
        const user = await User.create({
            name,
            username,
            email,
            password,
            profilePic,
        });
        const token = generateToken(user._id);
        res.status(201).json({token, user,id:user._id});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    try {
        const user = await User.findOne({email});
        if(!user || !(user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credentials"});
        }
        res.status(200).json({
            _id:user._id,
           user:{
            ...user.toObject(),
            totalPollsCreated : 0,
            totalPollsVotes : 0,
            totalPollsBookmarked: 0,
           },
            token:generateToken(user._id),
            message:"Login successful",
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }

}

exports.getUSerInfo = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        //add new fields to user object
        const userInfo = {
            ...user.toObject(),
            totalPollsCreated : 0,
            totalPollsVotes : 0,
            totalPollsBookmarked: 0,
        }
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
