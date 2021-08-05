const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.Now
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
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     trim: true,
//     required: "Username is Required"
//   },

//   password: {
//     type: String,
//     trim: true,
//     required: "Password is Required",
//     validate: [({ length }) => length >= 6, "Password should be longer."]
//   },

//   email: {
//     type: String,
//     unique: true,
//     match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
//   },

//   userCreated: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model("User", UserSchema);

// module.exports = User;