import Exercise from "../models/exercise.model.js";

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({});

        res.status(200).json({ success: true, data: exercises });
    } catch (error) {
        console.error("Error in fetching exercises", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createExercise = async (req, res) => {
    const exercise = req.body;

    if(!exercise.name || !exercise.description) {
        return res.status(400).json({ success: false, message: "Please provide a name and description" });
    }

    const newExercise = new Exercise(exercise);

    try {
        await newExercise.save();
        res.status(201).json({ success: true, data: newExercise });
    } catch (error) {
        console.error("Error in creating exercise", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
