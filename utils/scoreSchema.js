const { Schema, model } = require("mongoose");

const highScoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const HighScore = model("HighScore", highScoreSchema);

module.exports = HighScore;
