import WorkoutTemplate from '../models/workoutTemplate.model.js';

export const getAllWorkoutTemplates = async (req, res) => {
    try {
        const workoutTemplates = await WorkoutTemplate.find({}).populate("exercises");

        res.status(200).json({ success: true, data: workoutTemplates });
    } catch (error) {
        console.error("Error in fetching workout templates", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


export const createWorkoutTemplate = async (req, res) => {
    const workoutTemplate = req.body;

    if(!workoutTemplate.name || !workoutTemplate.exercises) {
        return res.status(400).json({ success: false, message: "Please provide a name and exercises" });
    }

    const newWorkoutTemplate = new WorkoutTemplate(workoutTemplate);

    try {
        await newWorkoutTemplate.save();
        res.status(201).json({ success: true, data: newWorkoutTemplate });
    } catch (error) {
        console.error("Error in creating workout template", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getWorkoutTemplateById = async (req, res) => {
    try {
        const workoutTemplate = await WorkoutTemplate.findById(req.params.id).populate("exercises.exercise");

        if(!workoutTemplate) {
            return res.status(404).json({ success: false, message: "Workout template not found" });
        }

        res.status(200).json({ success: true, data: workoutTemplate });
    } catch (error) {
        console.error("Error in fetching workout template", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getAllTemplatesById = async (req, res) => {
    try {
        const workoutTemplates = await WorkoutTemplate.find({ user: req.params.id }).populate("exercises.exercise");

        if(!workoutTemplates) {
            return res.status(404).json({ success: false, message: "Workout templates not found" });
        }

        res.status(200).json({ success: true, data: workoutTemplates });
    } catch (error) {
        console.error("Error in fetching workout templates", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}