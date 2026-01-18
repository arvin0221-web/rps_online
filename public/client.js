const socket = io();

function join() {
  socket.emit("joinRoom", {
    name: name.value,
    room: room.value
  });
  game.style.display = "block";
}

function play(choice) {
  socket.emit("play", choice);
}

socket.on("result", msg => {
  log.innerText = msg;
});

socket.on("system", msg => {
  log.innerText = msg;
});

// 接收公開選項並動態產生按鈕
socket.on("options", options => {
  buttons.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => play(opt);
    buttons.appendChild(btn);
  });
});
