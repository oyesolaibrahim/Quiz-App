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

/*    const newQuestion = {
        question: req.body.question,
        options: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
      };

      let existingData = [];
      try {
    existingData = JSON.parse(fs.readFileSync(data, 'utf8'));
    } catch (error) {
      console.error('Error reading existing data:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    let existingSubject = existingData.find((subject) => subject.subject === req.body.subject);

    if (!existingSubject) {
      existingSubject = {
        subject: req.body.subject,
        questions: [],
      };
      existingData.push(existingSubject);
    }
  
    // Add the new question to the subject's questions array
    existingSubject.questions.push(newQuestion);
  */
    Question.create(quizData)
    .then((question) => {
        res.status(201).json({message: "question created successfully"});
    })
    .catch((error) => {
        res.status(500).json({message: "server error", error})
    })
}


module.exports = {
    createQuestion
}