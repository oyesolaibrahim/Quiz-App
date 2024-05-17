const Question = require("../models/question.model");
const data = require("../assets/quizData.json")
const createQuestion = (req, res) => {

    if (!req.body.subject || !req.body.question || !req.body.options) {
    return res.status(400).json({message: "A required field is misssing"})
} 
    const quizData = {
        subject: req.body.subject,
        question: req.body.question,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer
    }

    Question.create(quizData)
    .then((question) => {
        res.status(201).json({message: "question created successfully"});
    })
    .catch((error) => {
        res.status(500).json({message: "server error", error})
    })
}

const frontEndDevelopmentQuestions = (req, res) => {
    Question.find({subject: "Frontend"})
    .then((gottenQuestions) => {
        res.status(200).json({message: "Frontend Questions Gotten Successfully", gottenQuestions})
    })
    .catch(error => {
        res.status(404).json({message: "Failed to fetch Frontend Questions", error})
    })
}

const backEndDevelopmentQuestions = (req, res) => {
    Question.find({subject: "Backend"})
    .then((gottenQuestions) => {
        res.status(200).json({message: "Backend Questions Gotten Successfully", gottenQuestions})
    })
    .catch(error => {
        res.status(404).json({message: "Failed to fetch Backend Questions", error})
    })
}
const fullstackDevelopmentQuestions = (req, res) => {
    Question.find({subject: "Fullstack"})
    .then((gottenQuestions) => {
        res.status(200).json({message: "FUllstack Questions Gotten Successfully", gottenQuestions})
    })
    .catch(error => {
        res.status(404).json({message: "Failed to fetch FUllstack Questions", error})
    })
}
const mobileDevelopmentQuestions = (req, res) => {
    Question.find({subject: "Mobile"})
    .then((gottenQuestions) => {
        res.status(200).json({message: "Mobile Questions Gotten Successfully", gottenQuestions})
    })
    .catch(error => {
        res.status(404).json({message: "Failed to fetch Mobile Questions", error})
    })
}
module.exports = {
    createQuestion,
    frontEndDevelopmentQuestions,
    backEndDevelopmentQuestions,
    fullstackDevelopmentQuestions,
    mobileDevelopmentQuestions
}