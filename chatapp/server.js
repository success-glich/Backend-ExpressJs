import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

let users = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

io.on("connection", (socket) => {
  console.log("a user is connected");

  io.emit("user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    socket.broadcast.emit("chat message", {
      message: msg,
    });

    // socket.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(" a user is disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on * :3000");
});
