var path = require("path");
const router = require("express").Router();
// const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");

router.get("/api/workouts/range", async (req, res) => {
  Workout.aggregate([
    {$addFields: { totalDuration: { $sum: '$exercises.duration' } } } 
  ])
  .sort({day: -1})
  .limit(7)
  .sort({day: 1})
  .then(aggregateInfo => {
    // console.log('============================');
    // console.log(aggregateInfo);
    res.json(aggregateInfo);
  })
  .catch(err => {
    res.json(err);
  })
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
      {$addFields: { totalDuration: { $sum: '$exercises.duration' } } } 
  ])
  // Workout.find({})
  //   .sort({ day: -1 }) 
    .then(foundWorkouts => {
      // console.log('?????????????????????????');
      // console.log(foundWorkouts);
      res.json(foundWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  // console.log(' *****PUT API-WORKOUTS*******');
  Workout.create(body)
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params}, res) => {
  // console.log(' *****PUT API-WORKOUTS-:id*******');
  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    // { $addFields: { totalDuration: { $sum: '$exercises.duration' } } },
    { new: true } 
  ).then(workoutUpdate => {


    // workoutUpdate.aggregate([
    //   {$addFields: { totalDuration: { $sum: '$exercises.duration' } } }, 
    //   { //options
    //     returnNewDocument: true,
    //     new: true,
    //     strict: false
    //   }
    // ]);

    // console.log(workoutUpdate);
    // console.log(workoutUpdate.totalDuration);

    res.json(workoutUpdate);

  })
  .catch(err => {
    res.status(404).json(err);
  })
});

module.exports = router;