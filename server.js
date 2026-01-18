const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const ADMIN_NAME = "xxx";


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static("public"));


const rooms = {};


// 預設剪刀石頭布規則（選項會公開，但 beats 與 text 不會給玩家）
let rules = {
scissors: { beats: "paper", text: "剪刀剪破了布" },
paper: { beats: "rock", text: "布包住了石頭" },
rock: { beats: "scissors", text: "石頭砸碎了剪刀" }
};


function getPublicOptions() {
return Object.keys(rules);
}


io.on("connection", socket => {
socket.on("joinRoom", ({ name, room }) => {
socket.name = name;
socket.room = room;
socket.isAdmin = name === ADMIN_NAME;


if (!rooms[room]) rooms[room] = [];
if (rooms[room].length >= 2) return;


rooms[room].push(socket);
socket.join(room);
server.listen(3000, () => console.log("Server running"));
