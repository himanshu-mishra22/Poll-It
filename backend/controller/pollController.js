const User = require('../models/UserModel');
const Poll = require('../models/Poll');


//for creating a new poll
exports.createPoll = async(req, res)=>{
    const {question, type, options, creatorId} = req.body;

    if(!question || !type || !creatorId){
        return res.status(400).json({message:"Question, type, and creatorId are required"});
    }

    try {

        let GivenOptions = [];
        switch(type){
            case "single-choice":
                if(!options || options.length < 2){
                    return res.status(400).json({message : "Must have atleast 2 options for single choice"});
                }
                GivenOptions = options.map((opt)=>({optionText : opt}));
                break;

            case "open-ended":
                GivenOptions = []; //no opts for open-ended
                break;

            case "rating":
                GivenOptions = [1,2,3,4,5].map((val)=>({
                    optionText : val.toString(),
                }));
                break;

            case "yes/no":
                GivenOptions = ["Yes", "No"].map((opt)=>({
                    optionText : opt
                }));
                break;

            case "image-based":
                if(!options || options.length < 2){
                    return res.status(400).json({message : "Must have atleast 2 options for image based"});
                } 

                GivenOptions = options.map((url)=>({
                    optionText : url,
                }));
                break;
              
            default:
                return res.status(400).json({message:"Invalid poll type"})  ;  
        }

        const newPoll = await Poll.create({
            question,
            type,
            options: GivenOptions,
            creator: creatorId
        });

        res.status(201).json(newPoll);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
        
    }
}

//get all polls
exports.getAllPolls = async(req,res)=>{
    const {type, creatorId , page =1, limit=10 } = req.query;
    const filter = {};
    const userId = req.user._id;
    if(type) filter.type = type;
    if(creatorId) filter.creator = creatorId;

    try {
        //pagination parameters
        const pageNum = parseInt(page,10);
        const pageSize = parseInt(limit,10);
        const skip = (pageNum - 1) * pageSize;

        //fetching polls with pagination
        const polls = await Poll.find(filter)
        .populate("creator","name username email profilePic")
        .populate({
            path: "responses.voterId",
            select:"username profilePic name"
        })
        .skip(skip)
        .limit(pageSize)
        .sort({createdAt : -1});

        const updatedPolls = polls.map((poll)=>{
            const userHasVoted = poll.voters.some((voterId)=>voterId === userId);
            return {
                ...poll.toObject(),
                userHasVoted,
            };
        });

        const totalPolls = await Poll.countDocuments(filter);
        const stats = await Poll.aggregate(
            [
                {
                   $group:{
                    _id:"$type",
                    count:{$sum:1},
                   }, 
                },
                {
                    $project:{
                        type:"$_id",
                        count:1,
                        _id:0,
                    },
                },
            ]);

            const allTypes = [
                {type: "single-choice", label: "Single Choice"},
                {type: "yes/no", label: "Yes/No"},
                {type: "rating", label: "Rating"},
                {type: "image-based", label: "Image Based"},
                {type: "open-ended", label: "Open Ended"},
            ];

            const statsWithDefaults = allTypes.map((pollType)=>{
                const stat = stats.find((item)=>item.type === pollType.type);
                return {
                    label : pollType.label,
                    type: pollType.type,
                    count : stat ? stat.count : 0,
                }
            }).sort((a,b)=> b.count - a.count);

            res.status(200).json({
                polls:updatedPolls,
                curentPage:pageNum,
                totalPages: Math.ceil(totalPolls/pageSize),
                totalPolls:totalPolls,
                stats:statsWithDefaults,
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }

}
//get voted polls
exports.votedPolls = async(req,res)=>{
    const {page = 1, limit=10} = req.query;
    const userId = req.user._id;
    try {

        //calculating pagination parameters
        const pageNum = parseInt(page,10);
        const pageSize = parseInt(limit,10);
        const skip = (pageNum - 1) * pageSize;


        //fetch polls where the user hasvoted
        const polls = await Poll.find({voters : userId}) //find the polls where the user's id is present in the voters array
        .populate("creator", "name profilePic username email")
        .populate({
            path: "responses.voterId",
            select:"username profilePic name"
        })
        .skip(skip)
        .limit(pageSize);

        const updatedPolls = polls.map((poll)=>{
            const userHasVoted = poll.voters.some((voterId)=> voterId.equals(userId));
            return {
                ...poll.toObject(),
                userHasVoted,
            }
        });


        const totalPolls = await Poll.countDocuments({voters : userId});

        res.status(200).json({
            polls: updatedPolls,
            currentPage: pageNum,
            totalPages: Math.ceil(totalPolls/pageSize),
            totalPolls
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}); 
    }
}
//get single polls
exports.getPollById = async(req,res)=>{
    const {id} = req.params;
    try {
        const poll = await Poll.findById(id)
        .populate("creator", "username email")
        .populate({
            path: "responses.voterId",
            select:"username profilePic name"
        })
        if(!poll){
            return res.status(404).json({message:"Poll not found"});
        }
        res.status(200).json(poll);



    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}); 
    }
}
//post a poll
exports.votePoll = async(req,res)=>{
    const  {id} = req.params;
    const {optionIndex, voterId, responseText} = req.body;
    try {

        const poll = await Poll.findById(id);
        if(!poll){
            return res.status(404).json({message: "Poll not found"});
        }

        if(poll.closed){
            return res.status(400).json({message : "Poll is closed."});
        }

        if(poll.voters.includes(voterId)){
            return res.status(400).json({message : "You have already voted."});
        }

        if(poll.type === "open-ended"){
            if(!responseText){
                return res.status(400).json({message: "Response text is required"});
            }

            poll.responses.push({voterId,responseText});
        }else{
            if(
                optionIndex === undefined ||
                optionIndex < 0 ||
                optionIndex >= poll.options.length
            ){
                return res.status(400).json({message: "Invalid option index"});
            }
            poll.options[optionIndex].votes += 1;
        }

        poll.voters.push(voterId);
        await poll.save();
        res.status(200).json(poll);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}); 
    }
}
//close a polls
exports.closePoll = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    try {
        const poll = await Poll.findById(id);

        if(!poll){
            return res.status(404).json({message: "Poll not found"});
        }

        if(poll.creator.toString() !== userId){
            return res.status(403).json({message: "You are not the creator of this poll"});
        }
        poll.closed = true;
        await poll.save();

        res.status(200).json({message: "Poll closed"});

    } catch (error) {
        res.status(500).json({message:error.message}); 
    }

}
//bookmsark a poll
exports.bookmarkPoll = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user._id;
    console.log(userId, id);
    
    try {
        const user = await User.findById(userId);
        if(!user){

            return res.status(404).json({message: "User not found"});
        }

        //checking if poll is already bookmarked
        const isBookmarked = user.bookmarks.includes(id);
        if(isBookmarked){
           //remove from bookmarked
           user.bookmarks  = user.bookmarks.filter((pollId) => pollId.toString() !== id );
           await user.save();
           return res.status(200).json({
            message: "Poll unbookmarked",
            bookmarks: user.bookmarks
        });
        }

        //add the poll to bm
        user.bookmarks.push(id);
        await user.save();
        res.status(200).json({
            message: "Poll bookmarked",
            bookmarks: user.bookmarks
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}); 
    }
}
//get all bookmarked polls
exports.getBookmarkedPolls = async(req,res)=>{
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate({
            path: 'bookmarks',
            populate:{
                path: 'creator',
                select: 'name email profilePic',
            },
        });

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const bookmarks = user.bookmarks;
        const updatePolls = bookmarks.map((poll)=>{
            const userHasVoted = poll.voters.some((voterId)=> voterId.equals(userId));
            return {
                ...poll.toObject(),
                userHasVoted,
            }
        });

        res.status(200).json({bookmarks: updatePolls});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}); 
    }
}
//delete a poll
exports.deletePoll = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;

    try {
        const poll = await Poll.findById(id);

        if(!poll){
            return res.status(404).json({message: "Poll not found"});
        }

        if(poll.creator.toString() !== userId){
            return res.status(403).json({
                message: "You cannot delete this poll"
            });
        }

        await Poll.findByIdAndDelete(id);
        res.status(200).json({message: "Poll deleted successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}