import express from 'express';
import { getWorkoutExercises, createWorkoutExercise } from '../controllers/workoutExercise.controller.js';

const router = express.Router();

router.get('/workoutExercises/', getWorkoutExercises);

router.post('/workoutExercises/', createWorkoutExercise);

export default router;