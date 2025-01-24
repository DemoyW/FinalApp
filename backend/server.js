import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();

app.post("/users",  async (req, res) => {
    const user = req.body; // req.body is the data that is sent with the POST request

    if(!user.usernaem || !user.password) {
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




app.listen(8000, () => {
    connectDB
    console.log("Server is running on port 8000");
});


// E1StHa52vjDGofWV