import express from "express";
import { getAllAnalytics, getAnalyticsByExerciseId } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/analytics/:userId", getAllAnalytics)

router.get("/analytics/:userId/:exerciseId", getAnalyticsByExerciseId)

export default router;



