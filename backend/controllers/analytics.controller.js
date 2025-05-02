import Workout from '../models/workout.model.js';

export const getAllAnalytics = async (req, res) => {
    try {
        const analytics = await Workout.find({ user: req.params.userId }).populate("exercises.exercise");

        const filteredData = (analytics) => {
            return analytics.flatMap(workout => {
                return workout.exercises
                .flatMap(exercise => {
                    return exercise.sets.map(set => ({
                        date: workout.date,
                        exerciseName: exercise.exercise.name,
                        setNumber: set.setNumber,
                        reps: set.reps,
                        weight: set.weight
                }));
            });
        });
    };
        res.status(200).json({ success: true, data: filteredData(analytics) });
    } catch (error) {
        console.error("Error in fetching analytics", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getAnalyticsByExerciseId = async (req, res) => {
    try {
        const analytics = await Workout.find({ user: req.params.userId, "exercises.exercise": req.params.exerciseId }).populate("exercises.exercise");  


        const filteredData = (analytics) => {
            return analytics.flatMap(workout => {
                return workout.exercises
                .filter(exercise => exercise.exercise._id.toString() === req.params.exerciseId)
                .flatMap(exercise => {
                    return exercise.sets.map(set => ({
                        date: workout.date,
                        exerciseName: exercise.exercise.name,
                        setNumber: set.setNumber,
                        reps: set.reps,
                        weight: set.weight
                }));
            });
        });
    };
        res.status(200).json({ success: true, data: filteredData(analytics) });
    } catch (error) {
        console.error("Error in fetching analytics", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}