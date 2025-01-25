import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error in fetching users", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
} );

router.post("/",  async (req, res) => {
    const user = req.body; // req.body is the data that is sent with the POST request

    if(!user.username || !user.password) {
        return res.status(400).json({ success:false, message: "Please provide a username and password" });
    }

    const newUser = new User(user)

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in create user", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }

});

router.put("/:id", async (req, res) => { 
    const { id } = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid ObjectId
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error in update user", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
const { id } = req.params;
    
    try {
        const deletedUser = await User.findByIdAndDelete(id);


        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        console.error("Error in delete user", error.message);
        res.status(404).json({ success: false, message: "User not found" });
    }
});


export default router;