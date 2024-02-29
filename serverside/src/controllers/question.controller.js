const Question = require("../models/question.model");

const createQuestion = (req, res) => {

    if (!req.body.subject || !req.body.question || !req.body.option1 || !req.body.option2 || !req.body.option3 || !req.body.option4) {
    return res.status(400).json({message: "A required field is misssing"})
} 
    const quizData = {
        subject: req.body.subject,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4
    }

    Question.create(quizData)
    .then((question) => {
        res.status(201).json({message: "question created successfully", questionId: question._id});
    })
    .catch((error) => {
        res.status(500).json({message: "server error", error})
    })
}


module.exports = {
    createQuestion
}