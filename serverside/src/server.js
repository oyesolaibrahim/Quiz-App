const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const quizData = require("./assets/quizData.json");
require('dotenv').config();
const { createQuestion, frontEndDevelopmentQuestions, backEndDevelopmentQuestions, fullstackDevelopmentQuestions, mobileDevelopmentQuestions } = require("./controllers/question.controller");
const { addUser, userLogin, userScore} = require("./controllers/user.controller");
const { addAdmin, login} = require("./controllers/admin.controller");

mongoose.connect("mongodb://0.0.0.0:27017/Quiz_App")
.then(() => {
    console.log("Database connected successfully!");
})
.catch((err) => {
    console.log("Error connecting to DB:", err.message);
});

const corsConfig = {
    origin: true,
    credentials: true,
    allowHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
      "Access-Control-Allow-Origin",
      "access-control-allow-Origin"
    ]
  }
  
  app.use(cors(corsConfig));

  
app.use(bodyParser.json());

app.get("/api/quizData", (req, res) => {
    res.json(quizData);
})
app.get("/api/frontendquestions", frontEndDevelopmentQuestions);
app.get("/api/backendquestions", backEndDevelopmentQuestions);
app.get("/api/fUllstackquestions", fullstackDevelopmentQuestions);
app.get("/api/mobilequestions", mobileDevelopmentQuestions);

app.post("/api/question", createQuestion);
app.post("/api/admin/signup", addAdmin);
app.post("/api/admin/login", login);
app.post("/api/user/signup", addUser);
app.post("/api/user/login", userLogin);
app.post("/api/user/score", userScore);
 
app.listen(process.env.PORT, () => {
    console.log("App running successfully")
})