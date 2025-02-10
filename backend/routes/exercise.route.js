import express from "express";
import { getExercises, createExercise } from "../controllers/exercise.controller.js";

const router = express.Router();

router.get("/exercises/", getExercises);

router.post("/exercises/", createExercise);

export default router;