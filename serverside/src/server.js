const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const quizData = require("./assets/quizData.json");
//const dotenv = require (".env");
const flash = require("connect-flash");
const session = require("express-session");
 const methodOverride = require("method-override"); 
const adminAuth = require ("./middleware/admin.middleware");
const userAuth = require ("./middleware/user.middleware");
const { createQuestion } = require("./controllers/question.controller");
const { userSignupPage, addUser, userLogin/* , userLoginPage, logout */} = require("./controllers/user.controller");

mongoose.connect("mongodb://0.0.0.0:27017/Quiz_App")
.then(() => {
    console.log("Database connected successfully!");
})
.catch((err) => {
    console.log("Error connecting to DB:", err.message);
});

//dotenv.config();
app.use(flash());
app.use(bodyParser.json());
//app.use((req, res, next) => {
    //res.locals.adminSession = req.session.adminId;
  //  next();
//})

//app.use((req, res, next) => {
//    res.locals.userSession = req.session;
//    next();
//})

app.get("/api/quizData", (req, res) => {
    res.json(quizData);
})
app.post("/api/question", createQuestion);
//app.get("/", homePage);
//app.get("/menus/new", adminAuth, createMenuPage);
//app.post("/menus", adminAuth, createMenu);

app.get("/api/user/signup", userSignupPage);
//app.get("/admin/signup", signupPage);
//app.get("/admin/login", loginPage);
//app.get("/user/login", userLoginPage);
//app.get("/admin/profile", adminAuth, profilePage);

//app.post("/admin/logout", logout);
//app.post("/admin/signup", addAdmin);
app.post("/api/user/signup", addUser);
//app.post("/admin/login", login);
app.post("/api/user/login", userLogin);
 
app.listen(5000, () => {
    console.log("App running successfully")
})