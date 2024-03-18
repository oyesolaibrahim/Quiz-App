const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: {
        type: [String],
        required: true,
        validate: [
            function(options) {
                return options && options.length === 4;
            },
            "Options array must have exactly 4 elements"
        ]
    },
    correctAnswer: { type: Number, required: true } 
}, { timestamps: true });

const questionModel = mongoose.model("Question", questionSchema);
module.exports = questionModel;
