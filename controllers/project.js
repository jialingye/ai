////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Project = require("../models/project");
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
//add 
  
  // project CREATE ROUTE
  router.post("/", async (req, res) => {
    try {
      // send all project
      res.json(await Project.create(req.body));
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