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
        ]
    });