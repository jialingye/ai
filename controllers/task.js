////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Task = require("../models/task");
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
  router.post("/single", async (req, res) => {
    const { description } = req.body;
  
    try {
      await Task.create({
        description: description.trim(),
        status: 'ongoing',
      });
  
      res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router;