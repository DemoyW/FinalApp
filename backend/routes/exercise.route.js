import express from "express";
import { getExercises, createExercise, getExerciseById } from "../controllers/exercise.controller.js";

const router = express.Router();

router.get("/exercises/", getExercises);

router.post("/exercises/", createExercise);

router.get("/exercises/:id", getExerciseById);

export default router;