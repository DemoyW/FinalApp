import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    setNumber: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

const workoutExerciseSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    sets: [setSchema],
});

const WorkoutExercise = mongoose.model("WorkoutExercise", workoutExerciseSchema);

export default WorkoutExercise;

//// THiS IS THE OLD IMPLEMENTATION