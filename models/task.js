// Import mongoose
const mongoose = require("./connection");

///////////////////////////////
// MODELS
////////////////////////////////
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    default: ""
  },
  input: {
    type: String,
    default: ""
  },
  answer: {
    type: String,
    default: ""
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }],
  status: {
    type: String,
    default: ""
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
