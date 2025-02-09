import mongoose from "mongoose";

const workoutExerciseSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    sets: {
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