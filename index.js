let board = [];
let over = false;
let playerTurn = 1;

function init() {
  boardDiv = document.getElementById("board");
  hoverDiv = document.getElementById("hover");
  boardDiv.addEventListener("mousemove", (event) => {
    const x = Math.floor(event.offsetX / fieldWidth);
    const y = Math.floor(event.offsetY / fieldHeight);
    hoverDiv.style.visibility = "visible";
    hoverDiv.style.left = x * fieldWidth + "px";
    hoverDiv.style.top = y * fieldHeight + "px";
    hoverDiv.style.width = fieldWidth + "px";
    hoverDiv.style.height = fieldHeight + "px";
  });
  boardDiv.addEventListener("mousedown", () => {
    console.log("mousedown");
    const x = Math.floor(event.offsetX / fieldWidth);
    const y = Math.floor(event.offsetY / fieldHeight);
    playMove(x, y);
    drawBoard();
  });
  board = [];
  playerTurn = 1;
}

function playMove(x, y) {
  if (over) {
    return;
  }
  const existing = getFieldByCoordinate(x, y);
  if (existing) {
    return;
  }
  board.push({ x: x, y: y, player: playerTurn });
  playerTurn = playerTurn === 1 ? 2 : 1;
}

function checkWin() {
  let win = [];
  for (let i = 0; i < board.length; i++) {
    const targetPlayer = board[i].player;
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (y === 0 && x === 0) {
          continue;
        }
        const c1 = getFieldByCoordinate(board[i].x + x, board[i].y + y);
        if (c1 && c1.player === targetPlayer) {
          const c2 = getFieldByCoordinate(
            board[i].x + x * 2,
            board[i].y + y * 2
          );
          if (c2 && c2.player === targetPlayer) {
            win.push(board[i], c1, c2);
            over = true;
            break;
          }
        }
      }
    }
  }
  return win;
}

function getFieldByCoordinate(x, y) {
  return board.find((field) => field.x === x && field.y === y);
}

var fieldWidth = 50;
var fieldHeight = 50;
var boardDiv;
var hoverDiv;
function drawBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < board.length; i++) {
    const field = board[i];
    const x = field.x * fieldWidth;
    const y = field.y * fieldHeight;
    const style = `
      display: block;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${fieldWidth}px;
      height: ${fieldHeight}px;
      background-color: ${field.player === 1 ? "#f00" : "#0f0"};
      border: 1px solid #000;
      content-align: center;
      text-align: center;
      cursor: move;
    `;
    boardDiv.innerHTML += `<div style="${style}">${
      field.player === 1 ? "X" : "O"
    }</div>`;
  }
  const win = checkWin();
  if (win.length > 0) {
    const winStyle = `
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    border: 1px solid #000;
    content-align: center;
    text-align: center;
    font-size: 42px;
    background-color: black;
    color:white;
    transform: translate(-50%, -50%);
    opacity:0.5;
  `;
    boardDiv.innerHTML += `<div style="${winStyle}">Pobedio je ${
      playerTurn === 1 ? "O" : "X"
    }</div>`;
  }
}
window.onload = () => {
  init();
  drawBoard();
};
