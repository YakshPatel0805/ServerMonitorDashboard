const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");
const metricsRoutes = require("./routes/metricsRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/metrics", metricsRoutes);

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Dashboard connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Dashboard disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});