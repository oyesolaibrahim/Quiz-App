const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const quizData = require("./assets/quizData.json");
//const dotenv = require (".env");
//const flash = require("connect-flash");
const { createQuestion } = require("./controllers/question.controller");
const { addUser, userLogin} = require("./controllers/user.controller");
const { addAdmin, login} = require("./controllers/admin.controller");

mongoose.connect("mongodb://0.0.0.0:27017/Quiz_App")
.then(() => {
    console.log("Database connected successfully!");
})
.catch((err) => {
    console.log("Error connecting to DB:", err.message);
});

//dotenv.config();
app.use(bodyParser.json());

app.get("/api/quizData", (req, res) => {
    res.json(quizData);
})

app.post("/api/question", createQuestion);
app.post("/api/admin/signup", addAdmin);
app.post("/api/admin/login", login);
app.post("/api/user/signup", addUser);
app.post("/api/user/login", userLogin);
 
app.listen(5000, () => {
    console.log("App running successfully")
})