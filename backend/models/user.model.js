import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isTrainer : {
        type: Boolean,
        default: false
    },
    specialities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speciality"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;