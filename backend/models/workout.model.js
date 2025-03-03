import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    notes: {
        type: String
    }
}, {
    timestamps: true
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;

