import express from "express"
import { createMessage, getMessages } from "../controllers/message.controller.js"

const router = express.Router();

router.get("/messages/", getMessages)

router.post("/messages/", createMessage)

export default router;