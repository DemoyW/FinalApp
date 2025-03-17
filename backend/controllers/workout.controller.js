import Workout from "../models/workout.model.js";

export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.params.id }).populate("exercises.exercise");

        if(!workouts) {
            return res.status(404).json({ success: false, message: "Workout not found" });
        }

        res.status(200).json({ success: true, data: workouts });
    } catch (error) {
        console.error("Error in fetching workouts", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createWorkout = async (req, res) => {
    const workout = req.body;

    if(!workout.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }

    const newWorkout = new Workout(workout);

    try {
        await newWorkout.save();
        res.status(201).json({ success: true, data: newWorkout });
    } catch (error) {
        console.error("Error in creating workout", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}