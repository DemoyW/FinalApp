import express from "express";
import { createResetOTP, verifyResetOTP, recoverPasswrod } from "../controllers/resetOTP.controller.js";

const router = express.Router();

router.post("/resetOTP", createResetOTP);

router.post("/verifyResetOTP", verifyResetOTP);

router.post("/recoverPassword", recoverPasswrod);

export default router;