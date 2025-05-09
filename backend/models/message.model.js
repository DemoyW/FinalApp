import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    message: {
        type: String,
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupChat",
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    } 
});

const Message = mongoose.model("Message", messageSchema);

export default Message;