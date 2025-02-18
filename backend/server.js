import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import exerciseRoutes from "./routes/exercise.route.js";
import workoutTemplateRoutes from "./routes/workoutTemplate.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json()); 

app.use(cors());

app.use("/api", userRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", workoutTemplateRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on http://localhost" + PORT);
});


// E1StHa52vjDGofWV