import User from "../models/user.model.js";
import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error in fetching users", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    } 
};

export const createUser = async (req, res) => {
    const user = req.body; 

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
};    

export const loginUser = async (req, res) => {
    const user = req.body;

    try {
        const foundUser = await User.findOne({ username: user.username, password: user.password });

        if(!foundUser) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        res.status(200).json({ success: true, data: foundUser });
    } catch (error) {
        console.error("Error in login user", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const updateUser =  async (req, res) => { 
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
};

export const deleteUser =  async (req, res) => {
    const { id } = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid ObjectId
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(id);


        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        console.error("Error in delete user", error.message);
        res.status(500).json({ success: false, message: "Server  error" });
    }
};

export const getUserById = async (req, res) => {
try {
    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
} catch (error) {
    console.error("Error in fetching user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
}
}

export const getTrainers = async (req, res) => {
    try {
        const trainers = await User.find({ isTrainer: true });

        res.status(200).json({ success: true, data: trainers });
    } catch (error) {
        console.error("Error in fetching trainers", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    } 
}

export const checkEmail = async (req, res) => {
        const {email} = req.body;

        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                return res.status(404).json({ success: false, message: "Email not found" });
            }
            res.status(200).json({ success: true, message: "Email found" });
        }
        catch (error) {
            console.error("Error in checking email", error.message);
            res.status(500).json({ success: false, message: "Server error" });
        }
}

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: "Please provide email and new password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.password = newPassword; // Update the password
        await user.save(); // Save the updated user


        res.status(200).json({ success: true, message: "Password updated successfully" });   
    
    } catch (error) {
        console.error("Error in resetting password", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
       

