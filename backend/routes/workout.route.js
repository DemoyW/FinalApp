import express from "express";
import { getWorkouts, createWorkout } from "../controllers/workout.controller.js";

const router = express.Router();

router.get("/workouts/:id", getWorkouts);

router.post("/workouts/", createWorkout);

export default router;