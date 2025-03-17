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
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
    sets: [setSchema],
});

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    exercises: [workoutExerciseSchema],

    notes: {
        type: String
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;

