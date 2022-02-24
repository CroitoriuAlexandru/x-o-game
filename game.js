let board = document.getElementById("board");
let statusGame = document.getElementById("statusGame");
let scoreX = document.getElementById("scoreX");
let scoreO = document.getElementById("scoreO");
let scireDraw = document.getElementById("scoreDraw");
let scoreX_count = 0;
let scoreO_count = 0;
let score_draw = 0;
let cellClickCount; // holds the current game cell's clicked
let playerTurn = true; // true = x's turn and false = o's
let gameCellsIndex = []; // this keeps a record of cell indexes as positions in the array with the values of "x" and "o"
let winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; // all the winning combinations

function startGame() {
  cellClickCount = 0;
  gameCellsIndex = [];
  statusGame.innerHTML = `Game in progress`;
  for (let i = 1; i <= 9; ++i) {
    gameCellsIndex.push("");
  }
  for (let i = 0; i < 9; ++i) {
    board.innerHTML +=
      `<div class="cell" id="` + i + `" onclick="cellClick(this)"></div>`;
  }
}

function gameWin() {
  board.childNodes.forEach((cell) => {
    cell.removeAttribute("onclick");
  });
  board.classList.add("overlay");
  if (playerTurn) {
    statusGame.innerHTML = `O WON`;
    ++scoreO_count;
    scoreO.innerHTML = scoreO_count;
  } else {
    statusGame.innerHTML = `X WON`;
    ++scoreX_count;
    scoreX.innerHTML = scoreX_count;
  }
}

function gameDraw() {
  ++score_draw;
  statusGame.innerHTML = `DRAW`;
  board.childNodes.forEach((cell) => {
    cell.removeAttribute("onclick");
    board.classList.add("overlay");
    gameDraw;
    scoreDraw.innerHTML = score_draw;
  });
}

function appendCellInGame(cell) {
  if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
    if (playerTurn) {
      cell.classList.add("x");
      board.classList.remove("x");
      board.classList.add("o");
      gameCellsIndex[cell.id] = "x";
      playerTurn = false;
      ++cellClickCount;
    } else {
      cell.classList.add("o");
      board.classList.remove("o");
      board.classList.add("x");
      gameCellsIndex[cell.id] = "o";
      playerTurn = true;
      ++cellClickCount;
    }
  }
}
// checks if the positions of x and o in gameCellsIndex match any combination from winCombinations
function checkWinConditions() {
  return winCombinations.some((combination) => {
    let pleyer;
    if (!playerTurn) player = "x";
    else player = "o";

    let win = combination.every((index) => {
      if (gameCellsIndex[index] === player) return true;
      return false;
    });

    if (win) return true;
    else return false;
  });
}
// cells call this function when clicked
function cellClick(cell) {
  appendCellInGame(cell);
  if (cellClickCount >= 5) {
    if (checkWinConditions()) {
      gameWin();
    } else if (cellClickCount == 9) {
      gameDraw();
    }
  }
}

function restartGame() {
  board.innerHTML = "";
  if (board.classList.contains("overlay")) board.classList.remove("overlay");
  startGame();
}

board.classList.add("x");
startGame();
