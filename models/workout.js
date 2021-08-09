const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
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
      distance: Number,
      weight: Number,
      sets: Number,
      reps: Number,
      duration: Number,
    }
  ]
});

// const WorkoutSchema = new Schema({
//   day: {
//     type: Date,
//     default: Date.Now
//   },
//   exercises: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Exercise"
//     }
//   ]
// });

const Workout = mongoose.model("Workout", WorkoutSchema, "workouts");

module.exports = Workout;