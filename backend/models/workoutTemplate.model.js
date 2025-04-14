import mongoose from "mongoose";


const setSchema = new mongoose.Schema({
    setNumber: {
        type: Number,
        required: true,
        default: 1
    },
    reps: {
        type: Number,
        default: 0

    },
    weight: {
        type: Number,
        default: 0
    
    }
});

const exerciseSchema = new mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true
    },
    sets: [setSchema]
});


const workoutTemplateSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        exercises: [exerciseSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    });

const WorkoutTemplate = mongoose.model("WorkoutTemplate", workoutTemplateSchema);

export default WorkoutTemplate;