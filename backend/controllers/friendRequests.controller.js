import FriendRequest from "../models/friendRequests.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiverId,
        });

        if (existingRequest) {
            return res.status(400).json({ success: false, message: "Friend request already sent." });
        }

        const newRequest = new FriendRequest({ sender: senderId, receiver: receiverId });
        await newRequest.save();

        res.status(201).json({ success: true, data: newRequest });
    } catch (error) {
        console.error("Error sending friend request:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    const { requestId } = req.params; // Assuming you pass the request ID in the URL

    try {
        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: "Friend request not found." });
        }

        // Add sender and receiver to each other's friends list
        const { sender, receiver } = request;
        await User.findByIdAndUpdate(sender, { $addToSet: { friends: receiver } });
        await User.findByIdAndUpdate(receiver, { $addToSet: { friends: sender } });

        // Delete the friend request
        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ success: true, message: "Friend request accepted." });
    } catch (error) {
        console.error("Error accepting friend request:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const rejectFriendRequest = async (req, res) => {
    const { requestId } = req.params; // Assuming you pass the request ID in the URL

    try {
        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: "Friend request not found." });
        }

        // Delete the friend request
        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ success: true, message: "Friend request rejected." });
    } catch (error) {
        console.error("Error rejecting friend request:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getFriendRequests = async (req, res) => {
    const { userId } = req.params; // Assuming you pass the user ID in the URL

    try {
        const requests = await FriendRequest.find({ receiver: userId }).populate("sender", "username");

        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        console.error("Error fetching friend requests:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getSentFriendRequests = async (req, res) => {
    const { userId } = req.params; // Assuming you pass the user ID in the URL

    try {
        const requests = await FriendRequest.find({ sender: userId }).populate("receiver", "username email");

        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        console.error("Error fetching sent friend requests:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}