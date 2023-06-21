////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Task = require("../models/task");
const Project = require("../models/project")
require("dotenv").config();
const {OPENAI_API_KEY} = process.env;

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
  // task CREATE ROUTE
  router.post("/multiple", async (req, res) => {
    const {aiResponse}= req.body
    const tasks = aiResponse.split('\n\n').filter(task => task.trim()!== '');
    console.log(tasks)

    try{
        for(const task of tasks){
            await Task.create({
                description:task.trim(),
                status: 'ongoing',
            });
        }
        res.status(200).json({message:'Tasks created successfully'});
    } catch (error){
        res.status(400).json(error);
    }
  });
 //create single task 
  router.post("/", async (req, res) => {
    const { projectId, tasks } = req.body;
  
    try {
    const createdTask = await Promise.all(
        tasks.map(async (taskDescription) => {
            const task = await Task.create({
                description: taskDescription.trim(),
                status: 'ongoing',
                project: projectId
            });
            const projectData = await Project.findById(projectId);
            projectData.tasks.push(task.id);
            await projectData.save();
        })
    )
        console.log(createdTask)
      res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router;