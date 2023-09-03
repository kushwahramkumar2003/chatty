const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4001;
const app = express();
app.use(cors());
const users = [{}];

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on(`joined`, ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} is joined`);
    socket.broadcast.emit(`userJoined`, {
      user: "Admin",
      // message: `${users[socket.id]} has joined`,
      message: `${user} has joined`,
    });
  });
  socket.emit("welcome", {
    user: "Admin",
    Message: `Welcome to the chat`,
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit(`leave`, {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });

    console.log("Client disconnected");
  });

  socket.on("message", ({ message, id }) => {
    if (message === "") return;
    console.log(message);
    io.emit("sendMessage", { user: users[id], message, id });
    // socket.broadcast.emit("message", { user: users[socket.id], message });
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
