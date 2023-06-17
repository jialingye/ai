// Import mongoose
const mongoose = require("./connection");

///////////////////////////////
// MODELS
////////////////////////////////
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  tags: [{
    type: String
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    default: "ongoing"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
