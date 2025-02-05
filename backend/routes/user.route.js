import express from "express";
import { createUser, deleteUser, getUsers, updateUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/", getUsers);

router.post("/users/",  createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id",  deleteUser);

router.post("/user/login" , loginUser);


export default router;