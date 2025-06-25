const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const userRouter = require("./routes/userRouter");
const problemRouter = require("./routes/problemRouter");
const connectDB = require("./database/db");
// const problems = require("./problems.json"); // Local problem list
const problems = require('./problem.json')

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/problem", problemRouter);

// Create HTTP Server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // or specific frontend URL
    methods: ["GET", "POST"],
  },
});

// In-memory room storage
const rooms = {};

// Helper: Random room ID
function generateRoomId(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

// Helper: Select problems based on difficulty
function selectProblems(data, difficulty) {
  const easy = data.filter((p) => p.difficulty.toLowerCase() === "easy");
  const medium = data.filter((p) => p.difficulty.toLowerCase() === "medium");
  const hard = data.filter((p) => p.difficulty.toLowerCase() === "hard");
  const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

  if (difficulty === "easy") return [...shuffle(easy).slice(0, 2), ...shuffle(medium).slice(0, 1)];
  if (difficulty === "medium") return [...shuffle(easy).slice(0, 1), ...shuffle(medium).slice(0, 2)];
  return [...shuffle(medium).slice(0, 2), ...shuffle(hard).slice(0, 1)];
}

// Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createRoom", ({ difficulty, time }, callback) => {
    const roomId = generateRoomId();
    const selectedProblems = selectProblems(problems, difficulty);

    rooms[roomId] = { problems: selectedProblems, time };
    socket.join(roomId);

    console.log(`Room created: ${roomId} (${difficulty})`);
    callback({ roomId });
  });

  socket.on("joinRoom", ({ roomId }) => {
    const room = rooms[roomId];
    if (room) {
      socket.join(roomId); 
      socket.emit("roomData", room);
    } else {
      socket.emit("error", "Room not found");
    } 
  });
});

// Start server
server.listen(port, () => {
  connectDB()
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database connection failed"));

  console.log(`Server running on http://localhost:${port}`);
});
 