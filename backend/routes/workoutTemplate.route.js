import express from "express";
import { getAllWorkoutTemplates, createWorkoutTemplate, getWorkoutTemplateById } from "../controllers/workoutTemplate.controller.js";

const router = express.Router();

router.get("/workout-templates/", getAllWorkoutTemplates);

router.post("/workout-templates/", createWorkoutTemplate);

router.get("/workout-templates/:id", getWorkoutTemplateById);

export default router;