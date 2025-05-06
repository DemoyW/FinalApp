import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 if not set in .env


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
    user.password = await hashPassword(user.password); // Hash the password before saving

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
        const foundUser = await User.findOne({ username: user.username });

        if(!foundUser) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        //checking hashed password
        const isMatch = await comparePassword(user.password, foundUser.password);
        if(!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        res.status(200).json({ success: true, data: foundUser });
    } catch (error) {
        console.error("Error in login user", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
// export const updateUser =  async (req, res) => { 
//     const { id } = req.params;
//     const user = req.body;

//     if(!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid ObjectId
//         return res.status(404).json({ success: false, message: "Invalid user id" });
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
//         res.status(200).json({ success: true, data: updatedUser });
//     } catch (error) {
//         console.error("Error in update user", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

// export const deleteUser =  async (req, res) => {
//     const { id } = req.params;
    

//     if(!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is a valid ObjectId
//         return res.status(404).json({ success: false, message: "Invalid user id" });
//     }
//     try {
//         const deletedUser = await User.findByIdAndDelete(id);


//         res.status(200).json({ success: true, message: "User deleted" });
//     } catch (error) {
//         console.error("Error in delete user", error.message);
//         res.status(500).json({ success: false, message: "Server  error" });
//     }
// };

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
        const trainers = await User.find({ isTrainer: true }).populate('specialities', 'name'); // Populate specialties with name

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
        const newHashedPassword = await hashPassword(newPassword); // Hash the new password
        user.password = newHashedPassword; // Update the password
        await user.save(); // Save the updated user


        res.status(200).json({ success: true, message: "Password updated successfully" });   
    
    } catch (error) {
        console.error("Error in resetting password", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const changePassword = async (req, res) => {
    const { id, newPassword, oldPassword } = req.body;

    if (!id || !newPassword || !oldPassword) {
        return res.status(400).json({ success: false, message: "Please provide id, old password and new password" });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the old password matches
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" });
        }

        const newHashedPassword = await hashPassword(newPassword); // Hash the new password
        user.password = newHashedPassword; // Update the password
        await user.save(); // Save the updated user

        res.status(200).json({ success: true, message: "Password updated successfully" });   
    
    }
    catch (error) {
        console.error("Error in changing password", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const changeDetails = async (req, res) => {
    const { id, email, username } = req.body;

    if (!id || !email || !username) {
        return res.status(400).json({ success: false, message: "Please provide id, email and username" });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if email is already in use by another user
        const emailInUse = await User.findOne({ email, _id: { $ne: id } });
        if (emailInUse) {
            return res.status(400).json({ success: false, message: "Email is already in use" });
        }

        // Check if username is already in use by another user
        const usernameInUse = await User.findOne({ username, _id: { $ne: id } });
        if (usernameInUse) {
            return res.status(400).json({ success: false, message: "Username is already in use" });
        }

        user.email = email; // Update the email
        user.username = username; // Update the username
        await user.save(); // Save the updated user

        res.status(200).json({ success: true, message: "User details updated successfully" });   
    
    }
    catch (error) {
        console.error("Error in changing details", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getAllFriends = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please provide user id" });
    }

    try {
        const user = await User.findById(id).populate("friends", "username"); // Populate friends with username 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user.friends }); // Return the friends array
    }
    catch (error) {
        console.error("Error in fetching friends", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

       

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error hashing password", error.message);
        throw new Error("Error hashing password");
    }
}

export async function comparePassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error comparing password", error.message);
        throw new Error("Error comparing password");
    }
}