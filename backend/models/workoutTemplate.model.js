import mongoose from "mongoose";

const workoutTemplateSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        exercises: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise"
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    });

const WorkoutTemplate = mongoose.model("WorkoutTemplate", workoutTemplateSchema);

export default WorkoutTemplate;