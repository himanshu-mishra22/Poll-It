const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
    //question posted
  question: {
    type: String,
    required: true,
  },
  //type of question(single-choice, rating, yes/no, etc)
  type: {
    type: String,
    required: true,
  },
  //options for the question
  options: [
    {
      optionText: {
        type: String,
        required: true,
      },
      //tracking the number of votes for each option
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  responses: [
    {
      //for open-ended polls
      voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      //user Response
      responseText: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //to prevent multiple votes
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closed:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Poll", PollSchema);
