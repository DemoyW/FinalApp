import express from "express";
import { getWorkoutTemplates, createWorkoutTemplate } from "../controllers/workoutTemplate.controller.js";

const router = express.Router();

router.get("/workout-templates/", getWorkoutTemplates);

router.post("/workout-templates/", createWorkoutTemplate);

export default router;