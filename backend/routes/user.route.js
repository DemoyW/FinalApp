import express from "express";
import { createUser, getUsers, loginUser, getUserById, getTrainers, checkEmail, resetPassword, changePassword, changeDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/", getUsers);

router.post("/users/",  createUser);

// router.put("/users/:id", updateUser);

// router.delete("/users/:id",  deleteUser);

router.post("/user/login" , loginUser);

router.get("/users/:id", getUserById);

router.get("/trainers", getTrainers);

router.post("/users/checkEmail", checkEmail);

router.post("/users/resetPassword", resetPassword);

router.post("/users/changePassword", changePassword);

router.post("/users/changeDetails", changeDetails);

// router.post("/users/recoverPassword", recoverPasswrod);

export default router;