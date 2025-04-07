import express from "express";
import { createResetOTP } from "../controllers/resetOTP.controller.js";

const router = express.Router();

router.post("/resetOTP", createResetOTP);

export default router;