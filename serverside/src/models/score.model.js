const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    userDetails: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, { timestamps: true });

const scoreModel = mongoose.model("Score", scoreSchema);
module.exports = scoreModel;
