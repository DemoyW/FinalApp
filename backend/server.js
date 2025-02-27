import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Server } from "socket.io";
import http from "http";  

import userRoutes from "./routes/user.route.js";
import exerciseRoutes from "./routes/exercise.route.js";
import workoutTemplateRoutes from "./routes/workoutTemplate.route.js";
import workoutRoutes from "./routes/workout.route.js";
import workoutExerciseRoutes from "./routes/workoutExercise.route.js";
import { SocketAddress } from "net";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json()); 

app.use(cors());

app.use("/api", userRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", workoutTemplateRoutes);
app.use("/api", workoutRoutes);
app.use("/api", workoutExerciseRoutes);

let users = {};

io.on("connection", (socket) => {
    console.log("A user has connected", socket.id);

    // registeting user
    socket.on('register_user', (username) => {
        users[username] = socket.id;
        console.log(`${username} connected with socket ID ${socket.id}`)
    })

    socket.on("send_message", (message, toUser) => {
        const targetUser = users[toUser];
        if (targetUser) {
            io.to(targetUser).emit('new_message', message);
            console.log(`Message setn to ${toUser}`, message)
        } else {
            console.log("Targer user not found")
        }
        // console.log("recieved message: ", data);
        // socket.emit('response',  data);
    }
    );

    socket.on("disconnect", () => {
        for (let username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                console.log(`${username} disconneted`)
                break
            }
        }
    });
});


server.listen(PORT, () => {
    connectDB();
    console.log("Server is running on http://localhost" + PORT);
});


// E1StHa52vjDGofWV