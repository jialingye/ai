////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Project = require("../models/project");
require("dotenv").config();
const {OPENAI_API_KEY} = process.env;

///////////////OPEN_AI/////////////////////////////////
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
///////////////////////////////

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

// ROUTES
////////////////////////////////

  // PEOPLE INDEX ROUTE
  router.get("/", async (req, res) => {
    try {
      // send all people
      res.json(await project.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // GET by id
router.get("/:id", async (req, res) => {
  try {
    res.json(await project.findById(req.params.id)).status(200);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  } finally {
    console.log("this is finally");
  }
});
//chatGPT API
async function chatgptAPI(userInput) {
  try {
    // Make the completion request using the openai.createCompletion method
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userInput + "please plan the project into different steps and list them in order",
      max_tokens: 100,
      temperature: 0.7,
    });

    // Extract and return the response data
    return response.data;
  } catch (error) {
    console.error('ChatGPT API request error:', error);
    throw error;
  }
}

  // project CREATE ROUTE
  router.post("/", async (req, res) => {
    const {title, description, tags, instruction} = req.body;
    console.log(title, description, tags, instruction)
    try {
      // send all project
      const projectObj = await Project.create({
        tags,
        title,
        description,
        status: 'ongoing'
      })

      const aiResponse = await chatgptAPI(instruction)
      res.json({project:projectObj, aiResponse});
      //res.json({project:projectObj});
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // project UPDATE ROUTE
  router.put("/:id", async (req, res) => {
    try {
      // send all project
      res.json(
        await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // project DELETE ROUTE
  router.delete("/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Project.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  module.exports = router;