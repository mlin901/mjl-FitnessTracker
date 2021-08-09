var path = require("path");
const router = require("express").Router();
// const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");

router.get("/api/workouts/range", async (req, res) => {
  Workout.aggregate([
    {$addFields: { totalDuration: { $sum: '$exercises.duration' } } } 
  ]).sort({day: -1})
  .limit(7)
  .sort({day: 1})
  .then(aggregateInfo => {
    console.log('============================');
    console.log(aggregateInfo);
    res.json(aggregateInfo);
  })
  .catch(err => {
    res.json(err);
  })
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then(foundWorkout => {
      res.json(foundWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params}, res) => {
  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true } 
  ).then(workoutUpdate => {
    res.json(workoutUpdate);
  })
  .catch(err => {
    res.status(404).json(err);
  })
});

module.exports = router;