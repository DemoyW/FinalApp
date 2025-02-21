import WorkoutExercise from "../models/workoutExercise.model.js";

export const getWorkoutExercises = async (req, res) => {
    try {
        const workoutExercises = await WorkoutExercise.find({});

        res.status(200).json({ success: true, data: workoutExercises });
    } catch (error) {
        console.error("Error in fetching workout exercises", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createWorkoutExercise = async (req, res) => {
    const workoutExercise = req.body;

    if(!workoutExercise.workout || !workoutExercise.exercise || !workoutExercise.sets) {
        return res.status(400).json({ success: false, message: "Please provide workout, exercise and sets" });
    }

    const newWorkoutExercise = new WorkoutExercise(workoutExercise);

    try {
        await newWorkoutExercise.save();
        res.status(201).json({ success: true, data: newWorkoutExercise });
    } catch (error) {
        console.error("Error in creating workout exercise", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}