import express from "express";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendRequests, getSentFriendRequests } from "../controllers/friendRequests.controller.js";

const router = express.Router();

router.post("/friend-requests/send", sendFriendRequest); // Send a friend request

router.get("/friend-requests/:userId", getFriendRequests); // Get friend requests for a user

router.get("/friend-requests/sent/:userId", getSentFriendRequests); // Get sent friend requests for a user

router.post("/friend-requests/accept/:requestId", acceptFriendRequest); // Accept a friend request

router.post("/friend-requests/reject/:requestId", rejectFriendRequest); // Reject a friend request

export default router;