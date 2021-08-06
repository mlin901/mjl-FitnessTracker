const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Exercise type is required"
  },
  name: {
    type: String,
    trim: true,
    required: "Exercise name is required"
  },
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
