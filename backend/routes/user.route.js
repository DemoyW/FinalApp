import express from "express";
import { createUser, deleteUser, getUsers, updateUser, loginUser, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/", getUsers);

router.post("/users/",  createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id",  deleteUser);

router.post("/user/login" , loginUser);

router.get("/users/:id", getUserById);

export default router;