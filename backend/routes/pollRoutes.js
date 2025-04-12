const express = require('express');
const {protect} = require('../middlewares/authMiddleware');
const {createPoll, getAllPolls, votedPolls, getPollById
    ,votePoll,closePoll,bookmarkPoll,getBookmarkedPolls,deletePoll
} = require('../controller/pollController');

const router = express.Router();

router.post("/create", protect, createPoll);
router.get("/getAllPolls", protect, getAllPolls);
router.get("/votedPolls", protect, votedPolls);
router.get("/:id", protect, getPollById);
router.post("/:id/vote", protect, votePoll);
router.post("/:id/close", protect, closePoll);
router.post("/:id/bookmark", protect, bookmarkPoll);
router.get("/user/bookmarked",protect,getBookmarkedPolls);
router.delete("/:id/delete", protect, deletePoll);


module.exports = router;