import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json()); // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

app.use("/api/users", userRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on http://localhost" + PORT);
});


// E1StHa52vjDGofWV