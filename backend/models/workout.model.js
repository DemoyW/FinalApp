import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    workoutExercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkoutExercise"
        }
    ],
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    }

});