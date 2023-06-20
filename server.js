///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// // pull PORT from .env, give default value of 4000
const { PORT = 4000 } = process.env;
const {OPENAI_API_KEY} = process.env;
// import express
const express = require("express");
// create application object
const app = express();
const projectRouter = require("./controllers/project");
const taskRouter = require("./controllers/task");
const userRouter = require("./controllers/user");


// import middleware
const cors = require("cors"); 
const morgan = require("morgan");

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

app.use("/project", projectRouter)
app.use("/task", taskRouter)

///////////////OPEN_AI/////////////////////////////////
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

///////////////////////////////
// ROUTES
////////////////////////////////

// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/ai", async (req, res) => {
  const { instruction } = req.body;
  try {
    // Make the completion request using the openai.createCompletion method
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: instruction + "please plan the project into different steps and list them in order",
      max_tokens: 100,
      temperature: 0.7,
    });

    // Extract and return the response data
    res.json(response.data);
  } catch (error) {
    console.error('ChatGPT API request error:', error);
    res.status(500).json({ error: 'An error occurred during the API request' });
  }
});



///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));