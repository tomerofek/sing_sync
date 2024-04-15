import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import { Server } from "socket.io";
import { createServer } from "http";
import { QUEUES_URL, ROOMS_URL, SONGS_URL } from "./routers/urls";
import { RoomController } from "./RoomController";

//routers
import roomRouter from "./routers/room.router";
import songRouter from "./routers/song.router";
import queueRouter from "./routers/queue.router";

dbConnect();


export const roomContoller = new RoomController()
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

//adding usage to the room api
app.use(ROOMS_URL, roomRouter);
app.use(SONGS_URL, songRouter);
app.use(QUEUES_URL, queueRouter);


app.use(express.static("public"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public","index.html"));
})

const port = process.env.PORT || 5000;

// Create an HTTP server and wrap the Express app
const httpServer = createServer(app);

// Create a Socket.IO instance, passing the HTTP server object
export const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST"], // Allow these HTTP methods
    },
  });


io.on("connection", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// send broadcast to all clients after post request
app.post("/api/hello", (req, res) => {
    const message = req.body.message; // Assuming the message is sent in the request body
    io.emit("broadcast", message);
    res.send({status : "ok"});
});




httpServer.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})

